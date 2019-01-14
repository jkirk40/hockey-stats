import React, { Component } from 'react';
import './App.css';

class SelectPlayer extends Component {
    
      render() {
        const roster = this.props.roster.roster;
        console.log(roster);

        if(typeof roster != 'undefined'){
          return (
            <div>
              {<select id="team" onChange={this.handleChange}>
                    {roster.map(roster => (
                      <option key={roster.person.id} value={roster.person.id}>
                        {roster.person.fullName}
                      </option>
                    ))}
                  </select>}
            </div>
            );        
        } else {
          return (
            <div>
              Select a team to see players
            </div>
          )
        }
      }
    }

export default SelectPlayer;