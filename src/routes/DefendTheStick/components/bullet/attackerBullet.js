import 'aframe';
import { h, Component } from 'preact';
import './component';

export default class AttackerBullet extends Component {
  componentDidMount() {
    const { shouldEmit, position } = this.props;
    const { x, y, z } = position;
    if (shouldEmit) {
      this.bullet.setAttribute('position', { x, y, z });
    }
  }

  render(props) {
    const { id, shouldEmit, position } = props;
    const { x, y, z } = position;
    return (
      <a-sphere
        ref={c => { this.bullet = c }}
        key={id}
        id={id}
        radius="0.2"
        geometry="primitive: sphere; radius: 0.2"
        material="color: red"
        dynamic-body
        random-color
        position={{ x, y, z }}
        bullet-emiter={`id: ${id}; shouldEmit: ${shouldEmit}`}
      />
    );
  }
}
