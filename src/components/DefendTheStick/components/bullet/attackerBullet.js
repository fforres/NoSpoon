import 'aframe';
import React, { Component } from 'react';
import CANNON from 'cannon';
import PropTypes from 'prop-types';

import './component';

export default class AttackerBullet extends Component {

  constructor(props) {
    super(props);
    this.worldOrigin = new CANNON.Vec3(0, Math.random() * 2.5, 0);
    this.bodyLoaded = this.bodyLoaded.bind(this);
  }

  componentDidMount() {
    this.bullet.addEventListener('body-loaded', () => {
      requestAnimationFrame(this.bodyLoaded);
    });
  }

  componentWillUnmount() {
    if (this.functionReferenceToRemove) {
      this.bullet.removeEventListener('body-loaded');
      this.bullet.parentNode.removeChild(this.bullet);
    }
  }

  bodyLoaded() {
    const impulseAmount = 10;
    const directionVector = new CANNON.Vec3().copy(
      this.worldOrigin.vsub(this.bullet.body.position)
    );
    const bulletVector = new CANNON.Vec3();
    bulletVector.copy(this.bullet.body.position);

    directionVector.normalize();
    directionVector.scale(impulseAmount, directionVector);
    this.bullet.body.applyImpulse(directionVector, bulletVector);
  }
  render() {
    const { name, position } = this.props;
    const { x, y, z } = position;
    return (
      <a-sphere
        grabbable
        mass={ 1 }
        maxGrabbers
        ref={ (c) => { this.bullet = c } }
        key={ name }
        id={ name }
        dynamic-body
        physics-body="boundingBox: 0.2 0.2 0.2; mass: 1;"
        radius="0.1"
        shader="flat"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: blue"
        position={ `${x} ${y} ${z}` }
        bullet-emiter={ `id: ${name}` }
      />
    );
  }
}

AttackerBullet.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
}
