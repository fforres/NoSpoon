import 'aframe';
import React, { Component } from 'react';
import CANNON from 'cannon';
import PropTypes from 'prop-types';

import './component';

export default class AttackerBullet extends Component {
  componentDidMount() {
    const camera = document.querySelector('[camera]');
    const attachment = document.querySelector('#attachment');

    this.bullet.setAttribute('position', camera.getAttribute('position'));

    const { position } = this.props;
    const { x, y, z } = position;

    this.bullet.addEventListener('body-loaded', () => {
      this.functionReferenceToRemove = arguments.calee;
      const impulseAmount = 20;
      setTimeout(() => {


        const pStart = new CANNON.Vec3();
        // Use an origin point behind the head, not at the head, so
        // there's a useful vector between the origin and the projectile.
        pStart.copy(new CANNON.Vec3(x, y, z));
        const force = this.bullet.body.position.vsub(pStart);
        force.normalize();
        force.scale(impulseAmount, force);
        this.bullet.body.applyImpulse(force, this.bullet.body.position);
        // Can't apply forces during the same tick that attaches the body, because
        // it hasn't been fully synced to the physics sim. (bug)
        // if (this.bullet) {
        //   const pointOfOrigin = new CANNON.Vec3(0, 0, 0);
        //   const bulletPosition = this.bullet.object3D.getWorldPosition();
        //   const force = new CANNON.Vec3().copy(bulletPosition);
        //   // const force = this.bullet.body.position;
        //   // force.normalize();
        //   // force.scale(impulseAmount, force);
        //   this.bullet.body.applyImpulse(
        //     // new CANNON.Vec3().copy(new CANNON.Vec3(0, -1, -1)),
        //     new CANNON.Vec3(0, 1, -1),
        //     new CANNON.Vec3().copy(this.bullet.object3D.getWorldPosition()),
        //   );
        // }

      }, 0);
    });
  }

  componentWillUnmount() {
    if (this.functionReferenceToRemove) {
      this.bullet.removeEventListener('body-loaded', this.functionReferenceToRemove)
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
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
}
