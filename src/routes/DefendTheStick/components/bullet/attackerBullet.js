import 'aframe';
import { h, Component } from 'preact';
import CANNON from 'cannon';

import './component';

export default class AttackerBullet extends Component {
  componentDidMount() {
    const { position } = this.props;

    this.bullet.addEventListener('body-loaded', () => {
      this.functionReferenceToRemove = arguments.calee;
      const impulseAmount = 20;
      setTimeout(() => {
        // Can't apply forces during the same tick that attaches the body, because
        // it hasn't been fully synced to the physics sim. (bug)
        if (this.bullet) {
          let pointOfOrigin = new CANNON.Vec3(1, 1, 1);
          const bulletPosition = this.bullet.object3D.getWorldPosition();
          const force = this.bullet.body.position.vsub(pointOfOrigin);
          force.normalize();
          force.scale(impulseAmount, force);
          this.bullet.body.applyImpulse(
            // new CANNON.Vec3().copy(new CANNON.Vec3(0, -1, -1)),
            new CANNON.Vec3().copy(force.vmul(new CANNON.Vec3(-1, -1, -1))),
            new CANNON.Vec3().copy(bulletPosition),
          );
        }
      }, 1);
    });

    const { x, y, z } = position;
    // if (shouldEmit) {
    this.bullet.setAttribute('position', { x, y, z });
    // }
  }

  componentWillUnmount() {
    if (this.functionReferenceToRemove) {
      this.bullet.removeEventListener('body-loaded', this.functionReferenceToRemove)
    }
  }

  render(props) {
    const { name, position } = props;
    const { x, y, z } = position;
    return (
      <a-sphere
        grabbable
        maxGrabbers
        ref={ c => { this.bullet = c } }
        key={ name }
        id={ name }
        dynamic-body
        physics-body="boundingBox: 0.2 0.2 0.2; mass: 1;"
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: blue"
        position={{ x, y, z }}
        bullet-emiter={ `id: ${name}` }
      />
    );
  }
}
