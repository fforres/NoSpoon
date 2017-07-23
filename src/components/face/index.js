import { h, Component } from 'preact';

export default class Face extends Component {
  render() {
    const { position, rotation, key } = this.props;
    return (
      <a-sphere
        key={key}
        position={`${position.x} ${position.y} ${position.z}`}
        rotation={`${rotation._x} ${rotation._y} ${rotation._z}`}
        radius="0.1"
        scale="3 3 3"
        random-color
        material="color:#972349"
      >
        <a-sphere
          position="-0.03 0.04 0.09"
          geometry="radius:0.01"
          scale="3 3 3"
          color="#FFFFFF"
        />
        <a-sphere
          scale="3 3 3"
          position="0.03 0.04 0.09"
          geometry="radius:0.01"
          color="#FFFFFF"
        />
      </a-sphere>
    );
  }
}
