import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import PlayerDefender from './components/playerDefender';
import PlayerAttacker from './components/playerAttacker';
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
    this.state = {};
    this.getPlayer = this.getPlayer.bind(this);
  }

  componentWillMount() {
    this.props.isPlayerReady();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isReady) {
      this.props.connectPlayers();
      this.props.connectBullets();
    }
  }


  getPlayer() {
    const { userID, isDefender } = this.props;
    if (isDefender) {
      return (
        <PlayerDefender
          userID={ userID }
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

  getPlayArea() {
    const { isDefender } = this.props;
    return (
      <PlayArea
        removeLife={ () => {} }
        isDefender={ isDefender }
      />
    );
  }

  render() {
    const { isReady } = this.props;
    const player = this.getPlayer();
    const playArea = this.getPlayArea();
    const assets = App.getAssets();
    return (
      <a-scene
        antialias={ 'true' }
        ref={ (c) => { this.scene = c; } }
        webvr-ui
        physics={ `
          debug: true;
          driver: local;
          gravity: 0;
        ` }
      >
        { assets }
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
};
App.propTypes = {
  userID: PropTypes.string.isRequired,
  isReady: PropTypes.bool,
  isDefender: PropTypes.bool,
  isPlayerReady: PropTypes.func.isRequired,
  connectPlayers: PropTypes.func.isRequired,
  connectBullets: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  isPlayerReady: () => dispatch(isPlayerReady()),
  connectPlayers: () => dispatch(connectPlayers()),
  connectBullets: () => dispatch(connectBullets()),
});

const mapStateToProps = ({ mainApp }) => ({
  userID: mainApp.userID,
  isDefender: mainApp.isDefender,
  isReady: mainApp.isReady,
  isHeadSet: mainApp.isHeadSet,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
