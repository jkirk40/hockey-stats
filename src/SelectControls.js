import React, { Component } from 'react';
import SelectPlayer from './SelectPlayer';
import SelectTeam from './SelectTeam';
import PlayerInfo from './PlayerInfo';
import PlayerWarning from './PlayerWarning';
import './App.css';

class SelectControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          teams: [],
          selectedTeam: 'New Jersey Devils',
          selectedTeamId: 1,
          roster: [],
          rosterGoalies: [],
          playerId: '',
          playerName: '',
          playerPos: ''
        };
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
      }
    
      componentDidMount() {
        fetch("https://statsapi.web.nhl.com/api/v1/teams")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                teams: result.teams
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
          this.fetchRoster("https://statsapi.web.nhl.com/api/v1/teams/1?expand=team.roster");
      }

      handleTeamSelect = (event) => {     
        const id = event.target.value;
        const url = "https://statsapi.web.nhl.com/api/v1/teams/"+id+"?expand=team.roster";
        
        //Team ids in object do not match actual id codes. Must be looked up
        for (var i=0; i<this.state.teams.length; i++){
          if(id == this.state.teams[i].id){ 
            this.setState({ selectedTeam: this.state.teams[i].name }); 
            break
          }
        }
        this.fetchRoster(url);

        const roster = this.state.roster.roster;
        const goalies = roster.filter(player => player.position.code =='G');
        this.setState({ rosterGoalies: goalies});
      };

      handlePlayerSelect = (event) => {     
        const id = event.target.value;
        const roster = this.state.roster.roster;

        for (var i=0; i<roster.length; i++){
          if(id == roster[i].person.id){ 
            this.setState({
              playerName: roster[i].person.fullName,
              playerPos: roster[i].position.code
            }); 
            break
          }
        }
      };

      fetchRoster = (url) => {
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                roster: result.teams[0].roster,
              });         
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
      render() {
        const { error, isLoaded, teams, roster, playerName, playerPos } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              <p>{this.state.selectedTeam}</p>
              
              <SelectTeam teams={teams} handleChange={this.handleTeamSelect}/>
              {roster.length != 0 ? <SelectPlayer roster={roster} handleChange={this.handlePlayerSelect}/> : 'Select a team to see players'}
              {playerPos == 'G' ? <PlayerInfo playerName={playerName} playerPos={playerPos}/> : <PlayerWarning playerName={playerName} playerPos={playerPos}/>}
              
            </div>
          );
        }
      }
    }

export default SelectControls;