import React, { Component } from 'react';
import './App.css';

class PlayerInfo extends Component {
    
  render() {

    return (
      <div>
        <p>{this.props.playerName}</p>
      </div>
    );        
  }
}

export default PlayerInfo;