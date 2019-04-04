import React, { Component } from 'react';
import './App.css';

class PlayerInfo extends Component {
    
  render() {
    console.log(this.props.playerStats);
    return (
      <div className="player-card">
        <h3>{this.props.playerName}</h3>
        <div className="stats-card">
          <p>Save Percentage: {this.props.playerStats.savePercentage}</p>
          <p>GAA: {this.props.playerStats.goalAgainstAverage}</p>
          <p>GP: {this.props.playerStats.games}</p>
          <p>Wins: {this.props.playerStats.wins}</p>
        </div>
      </div>
    );        
  }
}

export default PlayerInfo;