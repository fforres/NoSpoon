import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from '../routes/home';
import Minecraft from '../routes/minecraft';
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
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Minecraft path="/minecraft" />
        </Router>
      </div>
    );
  }
}
