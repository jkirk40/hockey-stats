import React, { Component } from 'react';
import './App.css';

class PlayerWarning extends Component {
    
  render() {
    let warning;

    if(this.props.playerPos == '') {
      warning = 'Please select a player to begin.';
    } else {
      warning = this.props.playerName + ' is not a goalie. Skater stats coming soon.';
    }

    return (
      <div>
        <p>{warning}</p>
      </div>
    );        
  }
}

export default PlayerWarning;