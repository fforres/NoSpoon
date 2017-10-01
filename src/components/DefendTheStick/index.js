import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import DefenderPlayer from './components/playerDefender';
import AttackerPlayer from './components/playerAttacker';
import OtherAttackers from './components/otherAttackers';
import PlayArea from './components/PlayArea';
import FireBase from '../../store/socket/Firebase';
import { getDisplay } from './components/helpers';
import { createCurrentPlayer } from '../../store/reducers/firebase';
import { connectPlayers } from '../../store/reducers/players';
import { connectBalls } from '../../store/reducers/balls';

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
    const defender = new URL(window.location.href).searchParams.get('defender');
    this.state = {
      startingLives: 3,
      timeStart: Date.now(),
      isDefender: (defender === 'true'),
      loser: false,
      userID: `user-${performance.now().toString().split('.').join('')}`,
      myBalls: [],
    }
  }

  componentWillMount() {
    this.startFireBase();
    this.prepareGame();
  }

  startFireBase() {
    const {
      createCurrentPlayer,
      connectPlayers,
      connectBalls
    } = this.props;
    createCurrentPlayer();
    connectPlayers();
    connectBalls();
  }

  prepareGame() {
    this.bindToState()
      .then(() => this.setFeedbackLoop())
      .then(() => this.emitState(this.state.startingLives))
      .then(() => getDisplay())
      .then((isHeadSet) => {
        this.setState({
          isHeadSet,
          isReady: true,
        });
      });
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

  removeLife() {
    this.emitState((this.state.lives - 1))
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

  createABall () {
    const { userID } = this.state;
    const Ball = {
      id: `${userID}_ball-${performance.now().toString().split('.').join('')}`,
    }
    this.setState({
      myBalls: [...this.state.myBalls, Ball],
    })
  }
  getPlayer() {
    const { lives, loser, isDefender, userID } = this.state;
    if (isDefender) {
      return (
        <DefenderPlayer
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
        userID={ userID }
      />
    );
  }

  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { isReady, userID, isDefender } = this.state;
    const player = this.getPlayer();
    const otherAttackers = <OtherAttackers userID={ userID } />
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
          gravity: 0;
        ` }
      >
        { assets }
        {
          isReady &&
          <PlayArea
            removeLife={ this.removeLife }
            isDefender={ isDefender }
          />
        }
        { isReady ? player : null }
        { isReady ? otherAttackers : null }

      </a-scene>
    );
  }
}

App.propTypes = {
  createCurrentPlayer: PropTypes.func.isRequired,
  connectPlayers: PropTypes.func.isRequired,
  connectBalls: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  createCurrentPlayer: () => dispatch(createCurrentPlayer()),
  connectPlayers: () => dispatch(connectPlayers()),
  connectBalls: () => dispatch(connectBalls()),
});

const mapStateToProps = ({ balls }) => ({
  ballsStore: balls,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
