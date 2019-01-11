import React, { Component } from 'react';
import './App.css';

class SelectPlayer extends Component {
    
      render() {
        const roster = this.props.roster.roster;
        let player = '';

        if(typeof roster != 'undefined'){
          console.log(roster);
          console.log(typeof roster[1]);
          console.log(roster[1]);
          player = roster[1].person.fullName;
        }

        return (
        <div>
          {player}
        </div>
        );
      }
    }

export default SelectPlayer;