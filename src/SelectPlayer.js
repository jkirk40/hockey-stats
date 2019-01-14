import React, { Component } from 'react';
import './App.css';

class SelectPlayer extends Component {
    
      render() {
        const roster = this.props.roster.roster;
        console.log(roster);
        let player = '';

        if(typeof roster != 'undefined'){
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