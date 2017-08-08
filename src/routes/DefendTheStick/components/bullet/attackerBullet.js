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
          new CANNON.Vec3().copy(new CANNON.Vec3(0, -1, 0)),
        );
      }, 0);
    });

    this.bullet.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    })
  }

  render(props) {
    const { name, shouldEmit } = props;
    return (
      <a-sphere
        grabbable
        maxGrabbers
        ref={c => { this.bullet = c }}
        id={name}
        dynamic-body
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: red"
        // random-color
        bullet-emiter={`id: ${name}; shouldEmit: ${shouldEmit}`}
      />
    );
  }
}
