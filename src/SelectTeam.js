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
              console.log(this.state.teams);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        
      }

      handleChange = (event) => {
        console.log(event.target.value);
        this.setState({ selectedTeam: event.target.value });
        
        fetch("https://statsapi.web.nhl.com/api/v1/teams/10?expand=team.roster")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                roster: result.teams[0].roster
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
                  <option key={team.name}>
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