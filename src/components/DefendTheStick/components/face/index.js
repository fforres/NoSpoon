import React, { Component } from 'react';
import { Entity } from 'aframe-react';
import PropTypes from 'prop-types';

export default class Face extends Component {

  static _renderEye(position) {

    return (
      <Entity
        geometry="primitive: sphere; radius: 0.05;"
        material={ 'color: #FFFFFF' }
        position={ position }
      >
        <Entity
          geometry="primitive: sphere; radius: 0.01"
          material={ 'color: #000000' }
          position={ '0 0 0.055' }
        />
      </Entity>
    )
  }

  static getFaceRotation(rotation) {
    return ({
      x: -THREE.Math.radToDeg(rotation._x),
      y: 180 + THREE.Math.radToDeg(rotation._y),
      z: THREE.Math.radToDeg(rotation._z),
    })
  }

  render() {
    const { id, position, rotation } = this.props;
    return (
      <Entity
        key={ id }
        name={ id }
        id={ id }
        geometry="primitive: sphere; radius: 0.3;"
        position={ `${position.x} ${position.y} ${position.z}` }
        rotation={ Face.getFaceRotation(rotation) }
        shadow="cast:true;receive:true;"
      >
        { Face._renderEye('0.1 0.09 0.278') }
        { Face._renderEye('-0.1 0.09 0.278') }
      </Entity>
    );
  }

}

Face.propTypes = {
  id: PropTypes.string.isRequired,
  rotation: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
    z: PropTypes.string
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }).isRequired
};
