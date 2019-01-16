import React, { Component } from 'react';
import './App.css';

class SelectTeam extends Component {
    
  render() {
    const teams = this.props.teams;
      return (
        <div>
          <select id="select-team" onChange={this.props.handleChange}>
            {teams.map(team => (
              <option key={team.name} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }

export default SelectTeam;