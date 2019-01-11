import React, { Component } from 'react';
import './App.css';
import SelectTeam from './SelectTeam';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <SelectTeam />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
