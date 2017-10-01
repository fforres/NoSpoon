import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './component';

export default class DefenderBullet extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const { position } = nextProps;
  //   this.bullet.setAttribute('position', {
  //     x: position.x,
  //     y: position.y,
  //     z: position.z,
  //   });
  // }

  // componentDidMount() {
  //   const { position } = this.props;
  //   this.bullet.setAttribute('position', {
  //     x: position.x,
  //     y: position.y,
  //     z: position.z,
  //   });
  // }

  render() {
    const { name, position } = this.props;
    const { x, y, z } = position;

    return (
      <a-sphere
        ref={ (c) => { this.bullet = c } }
        position={{ x, y, z }}
        id={ name }
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: red"
        // random-color
      />
    );
  }
}

DefenderBullet.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
}
