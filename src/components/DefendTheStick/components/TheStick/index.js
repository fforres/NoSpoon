import 'aframe';
import 'super-hands';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlayerBody extends Component {
  componentDidMount() {
    const { onColission, isDefender } = this.props;
    if (isDefender) {
      this.player.addEventListener('collide', () => {
        onColission();
      });
    }
  }
  render() {
    return (
      <a-cylinder
        ref={ (c) => { this.player = c } }
        id="playerBody"
        static-body
        radius="0.01"
        height="1.7"
        position="0 0 0"
      />
    );
  }
}

PlayerBody.propTypes = {
  onColission: PropTypes.func.isRequired,
  isDefender: PropTypes.bool.isRequired,
}
