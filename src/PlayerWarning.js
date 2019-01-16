import React, { Component } from 'react';
import './App.css';

class PlayerWarning extends Component {
    
  render() {

    return (
      <div>
        <p>{this.props.playerName} is not a goalie. Skater stats in progress.</p>
      </div>
    );        
  }
}

export default PlayerWarning;