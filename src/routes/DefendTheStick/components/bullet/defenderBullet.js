import 'aframe';
import { h, Component } from 'preact';
import './component';

export default class DefenderBullet extends Component {
  componentWillReceiveProps(nextProps) {
    const { shouldEmit, position } = this.props;
    if (!shouldEmit) {
      this.bullet.setAttribute('position', {
        x: position.x,
        y: position.y,
        z: position.z,
      })
    }
  }

  render(props) {
    const { id, shouldEmit, position } = props;
    return (
      <a-entity
        ref={c => { this.bullet = c }}
        key={id}
        geometry="primitive: sphere; radius: 0.3"
        material="color: red"
        random-color
      />
    );
  }
}
