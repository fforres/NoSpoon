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
    })
  }

  componentDidMount() {
    const { shouldEmit, position } = this.props;
    this.bullet.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    })
  }

  render(props) {
    const { name } = props;
    console.log(name);
    return (
      <a-entity
        ref={c => { this.bullet = c }}
        id={name}
        geometry="primitive: sphere; radius: 0.3"
        material="color: red"
        random-color
      />
    );
  }
}
