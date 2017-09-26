import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from 'preact-redux';

import store from '../store';
import Faces from '../routes/Faces';
import DefendTheStick from '../routes/DefendTheStick';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Router onChange={ this.handleRoute }>
          <Provider store={ store }>
            <DefendTheStick path="/" />
            <Faces path="/faces" />
          </Provider>
        </Router>
      </div>
    );
  }
}
