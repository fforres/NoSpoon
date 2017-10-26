import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HUD extends Component {
  constructor(props) {
    super(props);
    this.addColissionEvent = this.addColissionEvent.bind(this);
  }
  componentDidMount() {
    requestAnimationFrame(this.addColissionEvent);
  }

  addColissionEvent() {
    this.defender.addEventListener('hit', (e) => {
      if (e.detail.el) {
        this.props.onHit({ bulletId: e.detail.el.id });
      }
    });
  }

  render() {
    const { userID, winner } = this.props;
    return (
      <a-entity
        camera="userHeight: 1.6;"
        player-emiter={ `id: ${userID}; defender: true;` }
        look-controls
        wasd-controls
        super-hands
      >
        <a-entity
          sphere-collider={ `
            objects: .abullet;
            radius: 0.33;
          ` }
          geometry="primitive: sphere; radius: 0.32;"
          id={ 'COLLIDER_CONSTRAINT' }
          ref={ (c) => { this.defender = c; } }
          static-body
          position="0 0 0"
        />
      </a-entity>
    );
  }
}

HUD.defaultProps = {
  lives: 3,
  winner: '',
};

HUD.propTypes = {
  onHit: PropTypes.func.isRequired,
  winner: PropTypes.string,
  userID: PropTypes.string.isRequired
};

export default HUD;
