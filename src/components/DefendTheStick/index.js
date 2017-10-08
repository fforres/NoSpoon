import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import DefenderPlayer from './components/playerDefender';
import PlayerAttacker from './components/playerAttacker';
import OtherPlayers from './components/otherPlayers';
import PlayArea from './components/PlayArea';
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
    this.props.isPlayerReady();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isReady) {
      this.props.connectPlayers();
      this.props.connectBalls();
    }
  }


  getPlayer(isDefender) {
    const { fakeBulletCreator, userID } = this.props;
    if (isDefender) {
      return (
        <DefenderPlayer
          userID={ userID }
          fakeBulletCreator={ fakeBulletCreator }
          lives={ 10 }
          loser={ false }
        />
      );
    }
    return (
      <PlayerAttacker
        userID={ userID }
        lives={ 10 }
        winner={ false }
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
    const player = this.getPlayer(isDefender);
    const playAreaa = this.getPlayArea(isDefender)
    const assets = App.getAssets();
    return (
      <a-scene
        ref={ (c) => { this.scene = c } }
        webvr-ui
        physics={ `
          vr-mode-ui="enabled: true">
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
        { isReady ? <OtherPlayers /> : null }

      </a-scene>
    );
  }
}

App.defaultProps = {
  isReady: false,
  isDefender: false,
  userID: '',
}
App.propTypes = {
  userID: PropTypes.string.isRequired,
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
  connectPlayers: () => dispatch(connectPlayers()),
  connectBalls: () => dispatch(connectBalls()),
  deleteBullet: (...props) => dispatch(deleteBullet(...props)),
});

const mapStateToProps = ({ mainApp }) => ({
  userID: mainApp.userID,
  isDefender: mainApp.isDefender,
  isReady: mainApp.isReady,
  isHeadSet: mainApp.isHeadSet,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
