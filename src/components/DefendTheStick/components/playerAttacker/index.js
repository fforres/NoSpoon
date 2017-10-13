import 'aframe';
import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import CANNON from 'cannon';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { createBall } from '../../../../store/reducers/bullets';

class PlayerAttacker extends Component {

  static getPlayingHud(lives) {
    return (
      <a-entity
        geometry="primitive: plane; height: 0.3; width: 0.6"
        position="0.4 -0.4 -1"
        material="color: #0000FF; opacity: 0.5"
        text={ ['align:center', 'color:white', `value: ATTACK! Lives : ${lives}`].join(';') }
      />
    );
  }

  static Winner() {
    return (
      <a-entity
        geometry="primitive: plane; height: 4; width: 4"
        position="0 0 -2"
        material="color: #FF0000; opacity: 0.7"
        text={ ['align:center', 'color:white', 'value: ATTACK! YOU Win!!'].join(';') }
      />
    );
  }

  static getRandomPosition () {
    const angle = Math.random() * Math.PI * 2;
    const radius = 11; // size of the play-area
    // return `${(Math.cos(angle) * radius)} 1.8 ${(Math.sin(angle) * radius)}`;
    return { x: (Math.cos(angle) * radius), y: 1.8, z: -(Math.sin(angle) * radius) };
  }

  constructor(props) {
    super(props);
    this.state = {
      blocked: false,
    };
    this.onPressDragDelay = 150;
    this.impulseAmount = 4;
    this.bulletTimeout = 1250;
    this.initialPosition = PlayerAttacker.getRandomPosition();
    this.onClick = this.onClick.bind(this);
    this.startCounter = this.startCounter.bind(this);
    this.releaseCounter = this.releaseCounter.bind(this);
    this.blockUserBallCreator = this.blockUserBallCreator.bind(this);
    this.unBlockUserBallCreator = this.unBlockUserBallCreator.bind(this);
  }

  startCounter() {
    this.counter = performance.now();
  }

  releaseCounter() {
    if (this.state.blocked) {
      return;
    }
    if ((performance.now() - this.counter) > this.onPressDragDelay) {
      return;
    }
    this.blockUserBallCreator();
    this.onClick();
  }

  onClick() {
    const { createBall } = this.props;

    const bulletOrigin = this.bulletOrigin.object3D.getWorldPosition();
    const crossHair = this.crossHair.object3D.getWorldPosition();

    const crossHairVec = new CANNON.Vec3(crossHair.x, crossHair.y, crossHair.z);
    const bulletOriginVec = new CANNON.Vec3(bulletOrigin.x, bulletOrigin.y, bulletOrigin.z);

    const impulse = crossHairVec.vsub(bulletOriginVec);
    impulse.normalize();
    impulse.scale(this.impulseAmount, impulse);
    createBall({
      position: bulletOrigin,
      impulse,
    });
  }

  blockUserBallCreator() {
    this.setState({
      blocked: true,
    }, () => setTimeout(this.unBlockUserBallCreator, this.bulletTimeout));
  }

  unBlockUserBallCreator() {
    this.setState({
      blocked: false,
    });
  }

  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { lives, winner, userID } = this.props;
    const { blocked } = this.state;
    const hudContent = winner ? PlayerAttacker.Winner() : PlayerAttacker.getPlayingHud(lives);
    const cursorColor = blocked ? 'color: red' : 'color: green';
    const { x, y, z } = this.initialPosition;
    return (
      <a-camera
        primitive="a-camera"
        name={ 'PLAYER_ATTACKER CAMERA' }
        id={ 'PLAYER_CAMERA' }
        ref={ (c) => { this.camera = c; } }
        player-emiter={ `id: ${userID}; defender: false;` }
        position={ `${x} ${y} ${z}` }
        look-controls
      >
        <a-entity
          id={ 'BULLET_POSITION_ORIGIN' }
          position="0 0 -0.42"
          ref={ (c) => { this.bulletOrigin = c; } }
        />
        <a-plane
          static-body
          id={ 'PLAYER_BULLET_GENERATOR' }
          ref={ (c) => { this.bulletCreator = c; } }
          height="2"
          width="2"
          position="0 0 -0.11"
          material="opacity: 0.1; color: #697676;"
          className="bulletGenerator"
          class="bulletGenerator"
        />
        <a-entity
          id={ 'PLAYER_CROSSHAIR' }
          ref={ (c) => { this.crossHair = c; } }
          onMouseDown={ this.startCounter }
          onMouseUp={ this.releaseCounter }
          cursor="fuse: false;"
          position="0 0 -0.1"
          geometry={ 'primitive: ring; radius-inner: 0.002; radius-outer: 0.003;' }
          raycaster="interval: 100; objects: .bulletGenerator"
          material={ cursorColor }
        />
        { hudContent }
      </a-camera>
    );
  }
}

PlayerAttacker.defaultProps = {
  lives: 10,
  winner: true,
};

PlayerAttacker.propTypes = {
  createBall: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
  lives: PropTypes.number,
  winner: PropTypes.bool
};

const mapDispatchToProps = dispatch => ({
  createBall: data => dispatch(createBall(data)),
});

const mapStateToProps = ({ mainApp }) => ({
  userID: mainApp.userID,
});
export default connect(mapStateToProps, mapDispatchToProps)(PlayerAttacker);
