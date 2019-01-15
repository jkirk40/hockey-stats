import React, { Component } from 'react';
import './App.css';
import SelectControls from './SelectControls';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <SelectControls />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
