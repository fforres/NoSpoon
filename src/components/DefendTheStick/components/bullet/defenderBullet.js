import 'aframe';
import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import PropTypes from 'prop-types';
import './component';

export default class DefenderBullet extends Component {
  render() {
    const { name, position } = this.props;
    return (
      <Entity
        primitive={ 'a-sphere' }
        name={ 'defender bullet' }
        ref={ (c) => { this.bullet = c } }
        id={ name }
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: red"
        random-color
        position={ position }
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
