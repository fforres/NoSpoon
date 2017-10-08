import 'aframe';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CANNON from 'cannon';
import PropTypes from 'prop-types';
import { deleteBullet } from '../../../../store/reducers/balls';

import './component';

class AttackerBullet extends Component {

  constructor(props) {
    super(props);
    this.worldOrigin = new CANNON.Vec3(0, Math.random() * 2.5, 0);
    this.bodyLoaded = this.bodyLoaded.bind(this);
  }

  componentDidMount() {
    this.bullet.addEventListener('body-loaded', () => {
      requestAnimationFrame(this.bodyLoaded);
    });
    const { deleteBullet, name } = this.props;
    deleteBullet({ id: name })
  }

  componentWillUnmount() {
    if (this.functionReferenceToRemove) {
      this.bullet.removeEventListener('body-loaded');
      this.bullet.parentNode.removeChild(this.bullet);
    }
  }

  bodyLoaded() {
    const impulseAmount = 10;
    if (this.bullet) {
      const position = { ...this.bullet.body.position };
      const directionVector = new CANNON.Vec3().copy(
        this.worldOrigin.vsub(position)
      );
      const bulletVector = new CANNON.Vec3();
      bulletVector.copy(position);
      directionVector.normalize();
      directionVector.scale(impulseAmount, directionVector);
      this.bullet.body.applyImpulse(directionVector, bulletVector);
    }
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
  deleteBullet: PropTypes.func.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
}

const mapDispatchToProps = dispatch => ({
  deleteBullet: ({ id }) => dispatch(deleteBullet({ id })),
})

export default connect(null, mapDispatchToProps)(AttackerBullet);
