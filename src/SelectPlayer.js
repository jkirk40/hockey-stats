import React, { Component } from 'react';
import './App.css';

class SelectPlayer extends Component {
    
  render() {

    const roster = this.props.roster.roster;
    return (
      <div>
        <select id="team" onChange={this.handleChange}>
          {roster.map(roster => (
            <option key={roster.person.id} value={roster.person.id}>
              {roster.person.fullName}
            </option>
          ))}
        </select>
      </div>
    );        
  }
}

export default SelectPlayer;