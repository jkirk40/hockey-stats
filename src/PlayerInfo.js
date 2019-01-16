import React, { Component } from 'react';
import './App.css';

class PlayerInfo extends Component {
    
  render() {
    console.log(this.props.playerStats);
    return (
      <div>
        <p>{this.props.playerName}</p>
        <p>Save Percentage: {this.props.playerStats.savePercentage}</p>
      </div>
    );        
  }
}

export default PlayerInfo;