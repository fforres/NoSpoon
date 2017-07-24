import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import physics from 'aframe-physics-system';
physics.registerAll();

export default class PlayerBody extends Component {
  componentDidMount() {
    const { onColission, isDefender } = this.props;
    if (isDefender) {
      this.player.addEventListener('collide', () => {
        this.props.onColission();
      });
    }
  }
  render() {
    const { isDefender } = this.props;
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
