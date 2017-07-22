import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import style from './style';
import loadComponents from './components';
import CANNON from 'cannon';
import physics from 'aframe-physics-system';
import PlayerBody from './components/PlayerBody';
import HUD from './components/HUD';

physics.registerAll();

export default class Profile extends Component {
  componentWillMount() {
    loadComponents();
    this.prepareGame();
  }

  prepareGame = () => {
    this.setState({
      lives: 3,
      timeStart: Date.now(),
      looser: false,
    })
  }

  removeLife = () => {
    this.setState(({ lives }) => ({
      lives: (lives - 1),
    }), this.gameLoop)
  }

  gameLoop = () => {
    const { lives, timeStart } = this.state;
    const looser = (lives) < 0;
    const timePlaying = Date.now();
    const timeSession = looser ? timeStart - timePlaying : 0;
    this.setState({
      looser,
      timeSession,
    })
  }
  componentDidMount() {
    setTimeout(() => {
      this.box.body.applyImpulse(
        new CANNON.Vec3(10, 10, 2), /* impulse */
        new CANNON.Vec3().copy(this.box.getAttribute('position')) /* world position */
      );
    }, 10000)
  }

  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { lives, looser } = this.state;
    return (
      <a-scene physics="friction: 0.2; restitution: 1; gravity: -0.5; debug: true;" >
        <a-assets>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
          <a-mixin
            id="controller"
            super-hands
            sphere-collider="objects: .cube, .transformer"
            static-body="shape: sphere; sphereRadius: 0.02;"
          />
          <a-mixin id="cube-close" material="opacity: 0.7; transparent: true" />
          <a-mixin
            id="cube"
            geometry="primitive: box; width: 0.33; height: 0.33; depth: 0.33"
            hoverable
            grabbable
            drag-droppable
            dynamic-body
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
          grabbable
          maxGrabbers
          ref={c => { this.box = c }}
          dynamic-body
          position="0.5 10 0"
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

        <a-entity id="teleHand" hand-controls="left" mixin="controller" />
        <a-entity id="blockHand" hand-controls="right" mixin="controller" />
        <PlayerBody onColission={this.removeLife}/>

        <HUD lives={lives} looser={looser} />
      </a-scene>
    );
  }
}
