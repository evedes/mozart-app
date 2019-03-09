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
        <div className="my-2">
          <h4>MOZART WEBSERVER</h4>
        </div>
        <button className="btn btn-danger"
          onClick={() => console.log('click click...')}>
          Click Me!
        </button>
      </div>
    );
  }
}

export default App;
