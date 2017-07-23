import { h, Component } from 'preact';
import Face from '../../components/face';

export default class Faces extends Component {
  render() {
    return (
      <a-scene vr-mode-ui="enabled: true">
        <Face
          position={{x: 0, y: 1.5, z: -1}}
          rotation={{_x: 0, _y: 0, _z: 0}}
        />
      </a-scene>
    );
  }
}
