import 'aframe';
import { h, Component } from 'preact';
import './component';

export default class DefenderBullet extends Component {
  componentWillReceiveProps(nextProps) {
    const { shouldEmit, position } = this.props;
    if (!shouldEmit) {
      const { x, y, z } = position;
      this.bullet.setAttribute('position', { x, y, z });
    }
  }

  render(props) {
    const { id, shouldEmit, position } = props;
    const { x, y, z } = position;
    return (
      <a-sphere
        radius="0.2"
        ref={c => { this.bullet = c }}
        key={id}
        id={id}
        position={{ x, y, z }}
        material="color: red"
        random-color
      />
    );
  }
}
