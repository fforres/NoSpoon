import 'aframe';
import { h, Component } from 'preact';
import CANNON from 'cannon';

import './component';

export default class AttackerBullet extends Component {
  componentWillUnmount() {
    if (this.functionReferenceToRemove) {
      this.bullet.removeEventListener('body-loaded', this.functionReferenceToRemove)
    }
  }

  componentDidMount() {
    const { position } = this.props;

    this.bullet.addEventListener('body-loaded', () => {
      this.functionReferenceToRemove = arguments.calee;
      console.log(this.functionReferenceToRemove, arguments);
      let impulseAmount = 2;
      // Can't apply forces during the same tick that attaches the body, because
      // it hasn't been fully synced to the physics sim. (bug)
      setTimeout(() => {
        const theBullet = this.bullet;
        let pointOfOrigin = new CANNON.Vec3(1, 1, 1);
        // let pStart = new CANNON.Vec3();
        // pStart.copy(this.bullet.object3D.getWorldPosition());
        const bulletPosition = this.bullet.object3D.getWorldPosition();
        let force = this.bullet.body.position.vsub(pointOfOrigin);
        force.normalize();
        force.scale(impulseAmount, force);
        this.bullet.body.applyImpulse(
          new CANNON.Vec3().copy(bulletPosition),
          new CANNON.Vec3().copy(new CANNON.Vec3(0, -0.5, 0)),
        );
      }, 5000);
    });

    const { x, y, z } = position;
    // if (shouldEmit) {
    this.bullet.setAttribute('position', { x, y, z });
    // }
  }

  render(props) {
    const { name, shouldEmit, position } = props;
    const { x, y, z } = position;
    return (
      <a-sphere
        grabbable
        maxGrabbers
        ref={c => { this.bullet = c }}
        key={name}
        id={name}
        dynamic-body
        physics-body="boundingBox: 0.2 0.2 0.2; mass: 1; velocity: 0.2 0 0"
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: blue"
        // random-color
        position={{ x, y, z }}
        bullet-emiter={`id: ${name}; shouldEmit: ${shouldEmit}`}
      />
    );
  }
}
