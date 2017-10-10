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
    return `${Math.cos(angle) * radius} ${1.65} ${Math.sin(angle) * radius}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      blocked: false,
    };
    this.onPressDragDelay = 150;
    this.impulseAmount = 10;
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
    const cameraPosition = this.camera.el.object3D.getWorldPosition();
    const bulletCreatorPosition = this.bulletCreator.object3D.getWorldPosition();
    const newVector = new CANNON.Vec3().copy(bulletCreatorPosition).vsub(cameraPosition);

    // CALCULATE NEW BULLET POSITION
    const position = {
      x: bulletCreatorPosition.x + newVector.x,
      y: bulletCreatorPosition.y + newVector.y,
      z: bulletCreatorPosition.z + newVector.z,
    };

    // CALCULATE NEW BULLET IMPULSE
    const worldOrigin = new CANNON.Vec3(0, 0, 0);
    const directionVector = new CANNON.Vec3().copy(
      worldOrigin.vsub(position)
      // We get a vector from the current ball position towards the game center (0, 0, 0);
    ); // Immutable - We copy the vector to a new vector (Too prevent reference reusing);
    const bulletVector = new CANNON.Vec3();
    bulletVector.copy(position); // We copy the ball vector to a new vector.
    directionVector.normalize(); // Normalize (We make it size 1)
    directionVector.scale(this.impulseAmount, directionVector);
    // We scale it acording to the impulse size
    const impulse = {
      directionV: { ...directionVector },
      bulletV: { ...bulletVector },
    };
    // this.bullet.body.applyImpulse(directionVector, bulletVector);

    createBall({
      position,
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
    return (
      <Entity
        primitive="a-camera"
        name={ 'PLAYER_ATTACKER CAMERA' }
        id={ 'PLAYER_CAMERA' }
        ref={ (c) => { this.camera = c; } }
        player-emiter={ `id: ${userID}; defender: false;` }
        position={ this.initialPosition }
        look-controls
      >
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
          onMouseDown={ this.startCounter }
          onMouseUp={ this.releaseCounter }
          cursor="fuse: false;"
          position="0 0 -0.1"
          geometry={ 'primitive: ring; radius-inner: 0.002; radius-outer: 0.003;' }
          raycaster="interval: 100; objects: .bulletGenerator"
          material={ cursorColor }
        />
        { hudContent }
      </Entity>
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
