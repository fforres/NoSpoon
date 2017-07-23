import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import physics from 'aframe-physics-system';
physics.registerAll();

export default class PlayerBody extends Component {
  componentDidMount() {
    this.player.addEventListener('collide', () => {
      this.props.onColission();
      // e.detail.target.el;  // Original entity (playerEl).
      // e.detail.body.el;    // Other entity, which playerEl touched.
      // e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
      // e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });
  }
  render() {
    return (
      <a-cylinder
        ref={c => (this.player = c)}
        id="playerBody"
        static-body
        radius="0.01"
        height="1.7"
        position="0 0 0"
        random-color
      />
    );
  }
}
