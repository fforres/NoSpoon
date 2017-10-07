import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import DefenderPlayer from './components/playerDefender';
import AttackerPlayer from './components/playerAttacker';
import OtherAttackers from './components/otherAttackers';
import PlayArea from './components/PlayArea';
import FireBase from '../../store/socket/Firebase';
import { isPlayerReady } from '../../store/reducers/firebase';
import { connectPlayers } from '../../store/reducers/players';
import { connectBalls, deleteBullet, fakeBulletCreator } from '../../store/reducers/balls';

import '../../store/socket';

class App extends Component {

  static getAssets() {
    return (
      <a-assets>
        <img
          crossOrigin="anonymous"
          id="skyTexture"
          src="../../assets/sky-min.jpg"
          alt="skyTexture"
        />
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
        <a-mixin
          id="bullet"
          geometry="primitive: sphere; radius: 0.2"
          grabbable
          dynamic-body
        />
      </a-assets>
    );
  }
  constructor(props) {
    super(props);
    this.state = {}
    this.getPlayer = this.getPlayer.bind(this);
  }

  componentWillMount() {
    this.startSocket();
    this.prepareGame();
  }

  startSocket() {
    const {
      connectPlayers,
      connectBalls,
      isPlayerReady,
    } = this.props;
    isPlayerReady();
    connectPlayers();
    connectBalls();
  }

  prepareGame() {
    this.bindToState()
      .then(() => this.setFeedbackLoop())
  }

  winLoop() {
    const { lives, timeStart } = this.state;
    const loser = (lives <= 0);
    const timePlaying = Date.now();
    const timeSession = loser ? timeStart - timePlaying : 0;
    this.setState({
      loser,
      timeSession
    });
  }

  setFeedbackLoop() {
    return new Promise((resolve) => {
      this.state.FB.on('value', (snapshot) => {
        this.setState({
          lives: snapshot.val().lives,
        }, this.winLoop);
      })
      resolve();
    })
  }

  emitState(lives) {
    const { isDefender, FB } = this.state;
    let toReturn = {};
    if (isDefender) {
      toReturn = FB.set({ lives })
    }
    return toReturn;
  }

  bindToState () {
    return new Promise((resolve) => {
      this.setState({
        FB: FireBase.database().ref('/gameData'),
      }, resolve)
    })
  }

  getPlayer(isDefender) {
    const { fakeBulletCreator } = this.props;
    const { lives, loser, userID } = this.state;
    if (isDefender) {
      return (
        <DefenderPlayer
          fakeBulletCreator={ fakeBulletCreator }
          lives={ lives }
          loser={ loser }
          userID={ userID }
        />
      );
    }
    return (
      <AttackerPlayer
        lives={ lives }
        winner={ loser }
      />
    );
  }

  getPlayArea(isDefender) {
    const { deleteBullet } = this.props;
    return (
      <PlayArea
        removeLife={ () => {} }
        isDefender={ isDefender }
        deleteBullet={ deleteBullet }
      />
    );
  }

  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { isReady, isDefender } = this.props;
    const { userID } = this.state;
    const player = this.getPlayer(isDefender);
    const otherAttackers = <OtherAttackers userID={ userID } />
    const playAreaa = this.getPlayArea(isDefender)
    const assets = App.getAssets();
    return (
      <a-scene
        ref={ (c) => { this.scene = c } }
        environment
        rain-of-entities="spread: 3"
        physics={ `
          driver: local;
          workerFps: 60;
          workerInterpolate: true;
          workerInterpBufferSize: 2;
          gravity: -0.1;
        ` }
      >
        { assets }
        { isReady ? playAreaa : null }
        { isReady ? player : null }
        { isReady ? otherAttackers : null }

      </a-scene>
    );
  }
}

App.defaultProps = {
  isReady: false,
  isDefender: false,
}
App.propTypes = {
  isReady: PropTypes.bool,
  isDefender: PropTypes.bool,
  fakeBulletCreator: PropTypes.func.isRequired,
  isPlayerReady: PropTypes.func.isRequired,
  connectPlayers: PropTypes.func.isRequired,
  connectBalls: PropTypes.func.isRequired,
  deleteBullet: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fakeBulletCreator: () => dispatch(fakeBulletCreator()),
  isPlayerReady: () => dispatch(isPlayerReady()),
  connectPlayers: (...props) => dispatch(connectPlayers(...props)),
  connectBalls: () => dispatch(connectBalls()),
  deleteBullet: (...props) => dispatch(deleteBullet(...props)),
});

const mapStateToProps = ({ mainApp }) => ({
  isDefender: mainApp.isDefender,
  isReady: mainApp.isReady,
  isHeadSet: mainApp.isHeadSet,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
