import { h, Component } from 'preact';

export default class Face extends Component {
  componentWillReceiveProps(nextProps) {
    const { position, rotation } = nextProps;
    this.character.setAttribute('rotation', {
      x: -THREE.Math.radToDeg(rotation._x),
      y: 180 + THREE.Math.radToDeg(rotation._y),
      z: THREE.Math.radToDeg(rotation._z),
    })
    this.character.setAttribute('position', {
      x: position.x,
      y: position.y,
      z: position.z,
    })
  }

  render(props) {
    const { key } = props;
    return (
      <a-sphere
        ref={(c) => { this.character = c }}
        key={key}
        radius="0.3"
        random-color
      >
        <a-circle
          position="-0.09 0.1 0.30"
          color="#FFF"
          radius="0.05"
        >
          <a-circle
            position="0 0 0.01"
            color="#000"
            radius="0.01"
          />
        </a-circle>

        <a-circle
          position="0.09 0.1 0.30"
          color="#FFF"
          radius="0.05"
        >
          <a-circle
            position="0 0 0.01"
            color="#000"
            radius="0.01"
          />
        </a-circle>
      </a-sphere>
    );
  }
}
