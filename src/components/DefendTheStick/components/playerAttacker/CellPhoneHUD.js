import 'aframe';
import React, { Component } from 'react';

class CellPhoneHUD extends Component {
  static getPlayingHud(lives) {
    return (
      <a-entity
        geometry="primitive: plane; height: 0.3; width: 0.6"
        position="0.4 -0.4 -1"
        material="color: #0000FF; opacity: 0.5"
        text={ ['align:center', 'color:white', `value: Lives : ${lives}`].join(';') }
      />
    )
  }

  static Winner() {
    return (
      <a-entity
        geometry="primitive: plane; height: 4; width: 4"
        position="0 0 -2"
        material="color: #FF0000; opacity: 0.7"
        text={ ['align:center', 'color:white', 'value: YOU Win!!'].join(';') }
      />
    );
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onCursorClicked(e.detail.intersection.point);
  }

  render(props) {
    const { lives, winner, userID } = props;
    const hudContent = winner ? this.Winner() : this.getPlayingHud(lives);
    return (
      <a-entity
        camera
        id="CURRENT_PLAYER"
        player-emiter={ `id: ${userID}` }
        look-controls
        player-attacker
      >
        <a-entity
          onClick={ this.onClick }
          raycaster="objects: #bulletCreator"
          cursor="fuse: false"
          position="0 0 -1"
          geometry="primitive: ring; radius-inner: 0.01; radius-outer: 0.011;"
          material="color: rgba(200, 100, 100, 0.5); shader: flat"
        />
        { hudContent }
      </a-entity>
    );
  }
}

export default CellPhoneHUD;
