import { h, Component } from 'preact';
import style from './style';

export default class Faces extends Component {
  render() {
    return (
      <a-scene vr-mode-ui="enabled: true">
        <a-sphere
          position="0 1.5 -0.5"
          radius="0.1"
          geometry=""
          color="#EF2D5E"
          material="opacity:0.43999999999999995;color:#972349"
        >
          <a-sphere
            position="-0.03 0.04 0.09"
            radius="0.01"
            geometry=""
            color="#FFFFFF"
            material=""
          />
          <a-sphere
            position="0.03 0.04 0.09"
            radius="0.0.1"
            geometry="radius:0.01"
            color="#FFFFFF"
            material=""
          />
        </a-sphere>
        <a-cylinder
          static-body
          id="ground"
          src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          radius="32"
          height="0.1"
        />
      </a-scene>
    );
  }
}
