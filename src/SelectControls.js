import React, { Component } from 'react';
import SelectPlayer from './SelectPlayer';
import SelectTeam from './SelectTeam';
import './App.css';

class SelectControls extends Component {
    constructor(props) {
        super(props);
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          teams: [],
          selectedTeam: 'New Jersey Devils',
          selectedTeamId: 1,
          roster: [],
        };
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
        

        for (var i=0; i<this.state.teams.length; i++){
          if(id == this.state.teams[i].id){ 
            this.setState({ selectedTeam: this.state.teams[i].name }); 
            break
          }
        }
        this.fetchRoster(url);
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
        const { error, isLoaded, teams, roster } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              <p>{this.state.selectedTeam}</p>
              
              <SelectTeam teams={teams} handleChange={this.handleTeamSelect}/>
              <SelectPlayer roster={roster}/>
            </div>
          );
        }
      }
    }

export default SelectControls;