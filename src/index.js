import 'aframe';
import 'aframe-environment-component';
import 'aframe-physics-system/index';
import 'aframe-text-geometry-component';
import 'aframe-animation-component';
import sphereColider from 'aframe-extras/src/misc/sphere-collider';
import 'super-hands/dist/super-hands';
import 'webvr-ui/build/webvr-ui';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

AFRAME.registerComponent('sphere-collider', sphereColider);

const rootEl = document.getElementById('root');

ReactDOM.render(
  <App />,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  });
}
