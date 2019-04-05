import React, { Component } from 'react';
import './SelectTeam.css';

class SelectTeam extends Component {
    
  render() {
    const teams = this.props.teams;

    return (
      <div className="select-team">
        <ul className="list-team">
          {teams.map(team => (
            <li key={team.name} id={team.id} className={team.abbreviation} onClick={this.props.handleChange}>
              {team.abbreviation}
            </li>
          ))}
        </ul>
      </div>
    );
    }
  }

export default SelectTeam;