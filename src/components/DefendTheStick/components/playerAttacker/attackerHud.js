import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import PropTypes from 'prop-types';

class CellPhoneHUD extends Component {
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
    this.state = {
      initialPosition: CellPhoneHUD.getRandomPosition(),
    }
  }

  onClick(e) {
    this.props.onCursorClicked(e.detail.intersection.point);
  }

  render() {
    const { lives, winner, userID } = this.props;
    const hudContent = winner ? CellPhoneHUD.Winner() : CellPhoneHUD.getPlayingHud(lives);
    return (
      <a-entity
        camera="userHeight: 1.6;"
        player-emiter={ `id: ${userID}; defender: false;` }
        position={ this.state.initialPosition }
        look-controls
      >
        <a-entity
          onClick={ this.onClick }
          raycaster="objects: #bulletCreator"
          cursor="fuse: false"
          position="0 0 -1"
          geometry="primitive: ring; radius-inner: 0.01; radius-outer: 0.011;"
        />
        { hudContent }
      </a-entity>
    );
  }
}

CellPhoneHUD.defaultProps = {
  lives: 3,
  winner: false,
}

CellPhoneHUD.propTypes = {
  onCursorClicked: PropTypes.func.isRequired,
  lives: PropTypes.number,
  winner: PropTypes.bool,
  userID: PropTypes.string.isRequired
}

export default CellPhoneHUD;
