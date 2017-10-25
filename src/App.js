import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import NoSpoon from './components/DefendTheStick';
import './App.css';

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
