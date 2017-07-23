import { h, Component } from 'preact';

export default class Face extends Component {
  render() {
    const { position, rotation, key } = this.props;
    const scale = 3;
    return (
      <a-sphere
        key={key}
        position={`${position.x} ${position.y} ${position.z}`}
        rotation={`${rotation._x} ${rotation._y} ${rotation._z}`}
        radius="0.1"
        material="color:#972349"
        scale={`${scale} ${scale} ${scale}`}
        random-color
      >
        <a-sphere
          position="-0.03 0.04 0.09"
          geometry="radius:0.01"
          scale={`${scale} ${scale} ${scale}`}
          color="#FFFFFF"
        />
        <a-sphere
          position="0.03 0.04 0.09"
          geometry="radius:0.01"
          scale={`${scale} ${scale} ${scale}`}
          color="#FFFFFF"
        />
      </a-sphere>
    );
  }
}
