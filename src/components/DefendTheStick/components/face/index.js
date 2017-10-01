import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Face extends Component {
  componentWillReceiveProps(nextProps) {
    const { position, rotation } = nextProps;
    this.character.setAttribute('rotation', {
      x: -THREE.Math.radToDeg(rotation._x),
      y: 180 + THREE.Math.radToDeg(rotation._y),
      z: THREE.Math.radToDeg(rotation._z),
    })
    this.character.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    })
  }

  render() {
    const { key } = this.props;
    return (
      <a-sphere
        ref={ (c) => { this.character = c } }
        key={ key }
        radius="0.3"
        random-color
        shadow="cast:true;receive:true;"
      >
        <a-circle
          position="-0.09 0.1 0.30"
          color="#FFF"
          radius="0.05"
        >
          <a-circle
            position="0 0 0.01"
            color="#000"
            radius="0.01"
          />
        </a-circle>

        <a-circle
          position="0.09 0.1 0.30"
          color="#FFF"
          radius="0.05"
        >
          <a-circle
            position="0 0 0.01"
            color="#000"
            radius="0.01"
          />
        </a-circle>
      </a-sphere>
    );
  }
}

Face.propTypes = {
  key: PropTypes.string.isRequired,
  rotation: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
    z: PropTypes.string,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
}
