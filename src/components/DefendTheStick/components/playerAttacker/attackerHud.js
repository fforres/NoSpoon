import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import PropTypes from 'prop-types';

class AttackerHUD extends Component {
  static getPlayingHud(lives) {
    return (
      <a-entity
        geometry="primitive: plane; height: 0.3; width: 0.6"
        position="0.4 -0.4 -1"
        material="color: #0000FF; opacity: 0.5"
        text={ ['align:center', 'color:white', `value: ATTACK! Lives : ${lives}`].join(';') }
      />
    )
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
    this.onClick = this.onClick.bind(this);
    this.initialPosition = AttackerHUD.getRandomPosition();
  }

  componentDidMount() {
    console.log(this.boundingBall);
  }

  onClick() {
    // console.info(this, 'kjsdjhfdshjkdfs', this.props.onCursorClicked);
    this.props.onCursorClicked(this.camera.el.getAttribute('position'));
  }

  render() {
    const { lives, winner, userID } = this.props;
    const hudContent = winner ? AttackerHUD.Winner() : AttackerHUD.getPlayingHud(lives);
    return (
      <Entity
        primitive="a-camera"
        id={ 'PLAYER_CAMERA' }
        ref={ (c) => { this.camera = c } }
        player-emiter={ `id: ${userID}; defender: false;` }
        position={ this.initialPosition }
        look-controls
      >
        <a-plane
          static-body
          id={ 'PLAYER_BULLET_GENERATOR' }
          ref={ (c) => { this.boundingBall = c } }
          height="2"
          width="2"
          position="0 0 -0.11"
          material="opacity: 0.1; color: #697676;"
          className="bulletGenerator"
          class="bulletGenerator"
        />
        <a-entity
          click={ this.onClick }
          onClick={ this.onClick }
          cursor="fuse: false;"
          position="0 0 -0.1"
          geometry="primitive: ring; radius-inner: 0.002; radius-outer: 0.0021;"
          raycaster="interval: 100; objects: .bulletGenerator"
        />
        { hudContent }
      </Entity>
    );
  }
}

AttackerHUD.defaultProps = {
  lives: 3,
  winner: false,
}

AttackerHUD.propTypes = {
  onCursorClicked: PropTypes.func.isRequired,
  lives: PropTypes.number,
  winner: PropTypes.bool,
  userID: PropTypes.string.isRequired
}

export default AttackerHUD;
