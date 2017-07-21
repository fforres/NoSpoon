import { h, Component } from 'preact';
import style from './style';
import loadComponents from './components';

export default class Profile extends Component {
  componentWillMount() {
    loadComponents();
  }

  render() {
    return (
      <a-scene>
        <a-assets>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
        </a-assets>
        <a-entity geometry="primitive: box; depth: 0.5; height: 0.5; width 0.5"
          material="shader: standard"
          position="0 0.5 -2"
          random-color />
        <a-cylinder
          id="ground"
          src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          radius="32"
          height="0.1"
        />
        <a-sky
          id="background"
          src="#skyTexture"
          theta-length="90"
          radius="30"
        />
      </a-scene>
    );
  }
}
