import 'aframe';
import { h, Component } from 'preact';
import style from './style';
import loadComponents from './components';
import CANNON from 'cannon';
import physics from 'aframe-physics-system';
physics.registerAll();

export default class Profile extends Component {
  componentWillMount() {
    loadComponents();
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this.box);
      this.box.body.applyImpulse(
        new CANNON.Vec3(10, 10, 2), /* impulse */
        new CANNON.Vec3().copy(this.box.getAttribute('position')) /* world position */
      );
    }, 10000)
  }

  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    return (
      <a-scene physics="debug: true">
        <a-assets>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
          <a-mixin
            id="voxel"
            geometry="primitive: box; height: 0.5; width: 0.5; depth: 0.5"
            material="shader: standard"
            random-color
            snap="offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"
          />
        </a-assets>
        <a-entity
          geometry="primitive: box; depth: 0.5; height: 0.5; width 0.5"
          material="shader: standard"
          position="0 0.5 -2"
          random-color
        />
        <a-cylinder
          static-body
          id="ground"
          src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          radius="32"
          height="0.1"
        />

        <a-box static-body position="0 2 -5" width="3" height="1" depth="1" />
        <a-sphere
          ref={c => { this.box = c }}
          dynamic-body
          position="5 10 0"
          width="1"
          height="1"
          depth="1"
        />

        <a-sky
          id="background"
          src="#skyTexture"
          theta-length="90"
          radius="30"
        />

        <a-entity id="teleHand" hand-controls="left" />
        <a-entity id="blockHand" hand-controls="right" />

        <a-box constraint="target: #blockHand;" dynamic-body />
        <a-box constraint="target: #teleHand;" static-body />

      </a-scene>
    );
  }
}
