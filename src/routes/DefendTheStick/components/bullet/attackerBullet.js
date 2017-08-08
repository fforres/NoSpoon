import 'aframe';
import { h, Component } from 'preact';
import './component';

export default class AttackerBullet extends Component {
  componentDidMount() {
    const { shouldEmit, position } = this.props;
    if (shouldEmit) {
      this.bullet.setAttribute('position', {
        x: position.x,
        y: position.y,
        z: position.z,
      })
    }
  }

  render(props) {
    const { id, shouldEmit } = props;
    return (
      <a-entity
        ref={c => { this.bullet = c }}
        key={id}
        geometry="primitive: sphere; radius: 0.3"
        material="color: red"
        dynamic-body
        random-color
        bullet-emiter={`id: ${id}; shouldEmit: ${shouldEmit}`}
      />
    );
  }
}
