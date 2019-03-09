import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    info: 'nothing...',
  }

  componentDidMount() {
    fetch('/api', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    return (
      <div className="App">
        MOZART HOME
        <br/>
        renderING { this.state.info }
      </div>
    );
  }
}

export default App;
