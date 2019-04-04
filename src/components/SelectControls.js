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
          team: 'New Jersey Devils',
          teamId: 1,
          teamAbbrev: '',
          roster: [],
          rosterGoalies: [],
          playerStats: [],
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
        const id = event.target.id;
        const url = "https://statsapi.web.nhl.com/api/v1/teams/"+id+"?expand=team.roster";
        
        //Team ids in object do not match actual id codes. Must be looked up
        for (var i=0; i<this.state.teams.length; i++){
          if(id === this.state.teams[i].id.toString()){ 
            this.setState({ team: this.state.teams[i].name }); 
            break
          }
        }
        this.fetchRoster(url);

        const roster = this.state.roster.roster;
        const goalies = roster.filter(player => player.position.code ==='G');
        this.setState({ rosterGoalies: goalies});
      };

      handlePlayerSelect = (event) => {     
        const id = event.target.value;
        const url = "https://statsapi.web.nhl.com/api/v1/people/"+id+"/stats?stats=statsSingleSeason&season=20182019";
        const roster = this.state.roster.roster;

        for (var i=0; i<roster.length; i++){
          if(id === roster[i].person.id){ 
            this.setState({
              playerName: roster[i].person.fullName,
              playerPos: roster[i].position.code
            }); 
            break
          }
        }
        this.fetchPlayer(url);
      };

      fetchRoster = (url) => {
        fetch(url)
          .then(res => res.json())
          .then(
            (res) => {
              this.setState({
                roster: res.teams[0].roster,
                teamAbbrev: res.teams[0].abbreviation
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

      fetchPlayer = (url) => {
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                playerStats: result.stats[0].splits[0].stat,
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
        const { error, isLoaded, teams, roster, playerName, playerPos, playerStats } = this.state;
        const classStyle = 'App-container '+this.state.teamAbbrev;

        if (error) {
          return <div className='App-container'>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div className='App-container'>Loading...</div>;
        } else {
          return (
            <div className={classStyle}>
              <SelectTeam teams={teams} handleChange={this.handleTeamSelect}/>
              <h1>{this.state.team}</h1>
              
              
              {roster.length !== 0 ? <SelectPlayer roster={roster} handleChange={this.handlePlayerSelect}/> : 'Select a team to see players'}
              {playerPos === 'G' ? <PlayerInfo playerName={playerName} playerPos={playerPos} playerStats={playerStats}/> : <PlayerWarning playerName={playerName} playerPos={playerPos}/>}              
            </div>
          );
        }
      }
    }

export default SelectControls;