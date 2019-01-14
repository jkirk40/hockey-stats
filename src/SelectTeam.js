import React, { Component } from 'react';
import SelectPlayer from './SelectPlayer';
import './App.css';

class SelectTeam extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          teams: [],
          selectedTeam: 'No team selected',
          selectedTeamId: '0',
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
        
      }

      handleChange = (event) => {     
        const id = event.target.value;
        const url = "https://statsapi.web.nhl.com/api/v1/teams/"+id+"?expand=team.roster";

        for (var i=0; i<this.state.teams.length; i++){
          if(id == this.state.teams[i].id){
            this.setState({ selectedTeam: this.state.teams[i].name }); 
            break
          }
        }
        
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
      };
    
      render() {
        const { error, isLoaded, teams } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
              <p>{this.state.selectedTeam}</p>
              <select id="team" onChange={this.handleChange}>
                {teams.map(team => (
                  <option key={team.name} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              <SelectPlayer roster={this.state.roster}/>
            </div>
          );
        }
      }
    }

export default SelectTeam;