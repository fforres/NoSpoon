import 'aframe';
import { h, Component } from 'preact';
import './component';

export default class DefenderBullet extends Component {
  componentWillReceiveProps(nextProps) {
    const { position } = nextProps;
    this.bullet.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    });
  }

  componentDidMount() {
    const { position } = this.props;
    this.bullet.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    });
  }

  render(props) {
    const { name } = props;
    return (
      <a-sphere
        ref={c => { this.bullet = c }}
        id={name}
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
        material="color: red"
        random-color
      />
    );
  }
}
