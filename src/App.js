import 'aframe';
import 'aframe-environment-component';
import 'aframe-physics-system/index';
import 'super-hands/dist/super-hands';
import 'webvr-ui/build/webvr-ui';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import store from './store';
import DefendTheStick from './components/DefendTheStick';

import './App.css';

class AppContainer extends Component {
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

export default AppContainer;
