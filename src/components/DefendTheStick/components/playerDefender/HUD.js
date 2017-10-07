import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HUD extends Component {
  static getPlayingHud(lives) {
    return (
      <a-entity
        geometry="primitive: plane; height: 0.3; width: 0.6"
        position="0.4 -0.4 -1"
        material="color: #0000FF; opacity: 0.5"
        text={ ['align:center', 'color:white', `value: Lives : ${lives}`].join(';') }
      />
    );
  }

  static LOOSER() {
    return (
      <a-entity
        geometry="primitive: plane; height: 4; width: 4"
        position="0 0 -2"
        material="color: #FF0000; opacity: 0.7"
        text={ ['align:center', 'color:white', 'value: YOU LOST!!'].join(';') }
      />
    )
  }

  render() {
    const { lives, loser, userID } = this.props;
    const hudContent = loser ? HUD.LOOSER() : HUD.getPlayingHud(lives);
    return (
      <a-entity
        id="CURRENT_PLAYER DEFENDER"
        camera="userHeight: 1.6;"
        look-controls
        wasd-controls
        player-emiter={ `id: ${userID}; defender: true;` }
      >
        { hudContent }
      </a-entity>
    );
  }
}

HUD.defaultProps = {
  lives: 3,
  loser: false,
}

HUD.propTypes = {
  lives: PropTypes.number,
  loser: PropTypes.bool,
  userID: PropTypes.string.isRequired
}

export default HUD;
