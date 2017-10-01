import 'aframe';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

// ReactDOM.render(<App />, document.getElementById('root'));
const rootEl = document.getElementById('root')

ReactDOM.render(
  <App />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
