import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import store from './store';
import DefendTheStick from './components/DefendTheStick';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={ store }>
          <span>qweqwe</span>
          <DefendTheStick />
          { /*
           <Faces path="/faces" />
           */ }
        </Provider>
      </div>
      //   <header className="App-header">
      //   <img src={ logo } className="App-logo" alt="logo" />
      //   <h1 className="App-title">Welcome to React</h1>
      // </header>
      // <p className="App-intro">
      //   To get started, edit <code>src/App.js</code> and save to reload.
      // </p>
    );
  }
}

export default App;
