import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import PlayerDefender from './components/playerDefender';
import PlayerAttacker from './components/playerAttacker';
import WinnerBigText from './components/winnerBigText';
import OtherPlayers from './components/otherPlayers';
import PlayArea from './components/PlayArea';
import { isPlayerReady } from '../../store/reducers/app';
import { connectPlayers } from '../../store/reducers/players';
import { connectBullets } from '../../store/reducers/bullets';

import '../../store/socket';

class App extends Component {

  static getAssets() {
    return (
      <a-assets>
        <img
          crossOrigin="anonymous"
          id="groundTexture"
          src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          alt="groundTexture"
        />
        <a-mixin
          id="controller"
          super-hands
          sphere-collider="objects: .cube, .transformer .bullet"
          static-body="shape: sphere; sphereRadius: 0.02;"
        />
        <a-mixin
          id="cube"
          geometry="primitive: box; width: 0.33; height: 0.33; depth: 0.33"
          hoverable
          grabbable
          drag-droppable
          dynamic-body
        />

      </a-assets>
    );
  }
  constructor(props) {
    super(props);
    this.getPlayer = this.getPlayer.bind(this);
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getName();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isReady) {
      this.props.connectPlayers();
      this.props.connectBullets();
    }
  }

  getName() {

    if (process.env.NODE_ENV === 'development') {
      return this.props.isPlayerReady({
        userName: performance.now().toString(),
      });
    }
    const userName = window.prompt('Whats your name Player?'); // eslint-disable-line no-alert
    if (!userName) {
      return setTimeout(this.getName, 200);
    }
    return this.props.isPlayerReady({ userName });
  }

  getPlayer() {
    const { userID, isDefender, points } = this.props;
    if (isDefender) {
      return (
        <PlayerDefender
          userID={ userID }
          winner={ '' }
        />
      );
    }
    return (
      <PlayerAttacker
        userID={ userID }
        points={ points }
        winner={ false }
      />
    );
  }

  getPlayArea() {
    const { isDefender } = this.props;
    return (
      <PlayArea
        removeLife={ () => {} }
        isDefender={ isDefender }
      />
    );
  }

  getWinnerText() {
    const { winner } = this.props;
    if (winner.trim().length === 0) {
      return null;
    }
    return <WinnerBigText text={ `${winner.trim()}` } />;
  }

  render() {
    const { isReady } = this.props;
    const player = this.getPlayer();
    const playArea = this.getPlayArea();
    const assets = App.getAssets();
    const winnerText = this.getWinnerText();
    const debug = process.env.NODE_ENV === 'development' ? 'debug: true;' : '';

    return (
      <a-scene
        antialias={ 'true' }
        ref={ (c) => { this.scene = c; } }
        webvr-ui
        physics={ `
          iterations: 20;
          ${debug}
          driver: local;
          gravity: 0;
        ` }
      >
        { assets }
        { isReady ? winnerText : null }
        { isReady ? playArea : null }
        { isReady ? player : null }
        { isReady ? <OtherPlayers /> : null }
      </a-scene>
    );
  }
}

App.defaultProps = {
  isReady: false,
  isDefender: false,
  userID: '',
  winner: '',
  points: 0,
};
App.propTypes = {
  userID: PropTypes.string,
  isReady: PropTypes.bool,
  isDefender: PropTypes.bool,
  points: PropTypes.number.isRequired,
  isPlayerReady: PropTypes.func.isRequired,
  connectPlayers: PropTypes.func.isRequired,
  connectBullets: PropTypes.func.isRequired,
  winner: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  isPlayerReady: ({ userName }) => dispatch(isPlayerReady({ userName })),
  connectPlayers: () => dispatch(connectPlayers()),
  connectBullets: () => dispatch(connectBullets()),
});

const mapStateToProps = ({ mainApp }) => ({
  userID: mainApp.userID,
  isDefender: mainApp.isDefender,
  isReady: mainApp.isReady,
  points: mainApp.points,
  winner: mainApp.winner.userName,
  isHeadSet: mainApp.isHeadSet,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
