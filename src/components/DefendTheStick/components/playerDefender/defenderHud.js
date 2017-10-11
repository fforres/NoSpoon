import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'aframe-react';

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
    );
  }


  constructor(props) {
    super(props);
    this.onColission = this.onColission.bind(this);
  }

  componentDidMount() {
    this.defender.addEventListener('collide', this.onColission);
  }

  onColission(e) {
    console.log(e, this);
  }

  render() {
    const { lives, loser, userID } = this.props;
    const hudContent = loser ? HUD.LOOSER() : HUD.getPlayingHud(lives);
    return (
      <a-entity
        camera="userHeight: 1.6;"
        player-emiter={ `id: ${userID}; defender: true;` }
        look-controls
        wasd-controls
        super-hands
      >
        <a-entity
          id={ 'COLLIDER_CONSTRAINT' }
          static-body="shape: sphere; sphereRadius: 0.1"
        >
          { hudContent }
        </a-entity>
        <a-entity
          id={ 'COLLIDER' }
          constraint={ `
            target: #COLLIDER_CONSTRAINT;
            type: distance;
            distance: 0;
            collideConnected: false;
            shape: sphere;
            sphereRadius: 0.3;
          ` }
          dynamic-body="linearDamping: 1; angularDamping: 1;"
          ref={ (c) => { this.defender = c; } }
        />
      </a-entity>
    );
  }
}

HUD.defaultProps = {
  lives: 3,
  loser: false,
};

HUD.propTypes = {
  lives: PropTypes.number,
  loser: PropTypes.bool,
  userID: PropTypes.string.isRequired
};

export default HUD;
