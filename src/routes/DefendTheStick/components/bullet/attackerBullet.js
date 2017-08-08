import 'aframe';
import { h, Component } from 'preact';
import './component';

export default class AttackerBullet extends Component {
  componentDidMount() {
    const { position } = this.props;
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
        ref={c => { this.bullet = c }}
        id={name}
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: red"
        dynamic-body
        random-color
        bullet-emiter={`id: ${name}; shouldEmit: ${shouldEmit}`}
      />
    );
  }
}
