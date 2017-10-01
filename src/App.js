import 'aframe';
import 'aframe-physics-system/index';
import 'super-hands';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './randomColor';
import logo from './logo.svg';
import store from './store';
import DefendTheStick from './components/DefendTheStick';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={ store }>
          <DefendTheStick />
        </Provider>
      </div>
    );
  }
}

export default App;
