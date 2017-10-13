import 'aframe';
import 'aframe-environment-component';
import 'aframe-physics-system/index';
import sphereColider from 'aframe-extras/src/misc/sphere-collider';
import 'super-hands/dist/super-hands';
import 'webvr-ui/build/webvr-ui';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import logo from './logo.svg';
import store from './store';
import NoSpoon from './components/DefendTheStick';
import './App.css';

AFRAME.registerComponent('sphere-collider', sphereColider);

class AppContainer extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={ store }>
          <NoSpoon />
        </Provider>
      </div>
    );
  }
}

export default AppContainer;
