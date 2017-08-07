import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import TheStick from '../TheStick';
import Bullet from '../bullet';

class PlayArea extends Component {
  componentDidMount() {
    // setTimeout(() => {
    //   this.box.body.applyImpulse(
    //     new CANNON.Vec3(10, 10, 2) /* impulse */,
    //     new CANNON.Vec3().copy(
    //       this.box.getAttribute('position')
    //     ) /* world position */
    //   );
    // }, 10000);
  }

  renderBalls = () => {
    const { balls } = this.props;
    return balls.map(ball => <Bullet id={ball.id} />)
  }
  render() {
    const { removeLife, isDefender } = this.props;
    const myBalls = this.renderBalls();
    const otherPersonsBalls = [];
    return (
      <a-entity>
        <a-entity
          id="sun"
          light="angle:45;decay: 0.5; color:#F0F0F0;type:directional"
          position="0 5.417 0"
          rotation="-81.64648580614231 0 0"
        />

        <a-entity
          id="floor"
          light="angle:45;decay: 0.1; color:#F0F0F0;type:ambient"
          position="0 1 0"
          rotation="0 0 0"
        />
        <a-cylinder
          static-body
          shadow="cast:true;receive:true;"
          id="ground"
          src="https://cdn.aframe.io/a-painter/images/floor.jpg"
          radius="32"
          height="0.1"
        />
        <a-cylinder
          shadow="cast:true;receive:true;"
          static-body
          id="playArea"
          radius="9"
          material="color: rgb(123,123,123); opacity: 0.5;"
          height="0.3"
        />
        <a-cylinder
          static-body
          id="bulletCreator"
          radius="9"
          geometry="height:30"
          material="color:rgb(100,100,100);opacity:0.1"
          position="0 15 0"
        />
        <TheStick onColission={removeLife} isDefender={isDefender} />
        {/* <a-sphere
          grabbable
          maxGrabbers
          ref={c => {
            this.box = c;
          }}
          dynamic-body
          position="0.5 10 0"
          width="1"
          height="1"
          depth="1"
        />
        <a-sphere
          grabbable
          maxGrabbers
          ref={c => {
            this.box = c;
          }}
          dynamic-body
          position="0.5 30 0"
          width="1"
          height="1"
          depth="1"
        />
        <a-sphere
          grabbable
          maxGrabbers
          ref={c => {
            this.box = c;
          }}
          dynamic-body
          position="0.5 100 0"
          width="1"
          height="1"
          depth="1"
        /> */}
        { myBalls }
        { otherPersonsBalls }
        <a-sky
          id="background"
          src="#skyTexture"
          theta-length="90"
          radius="30"
        />
      </a-entity>
    );
  }
}

const mapDispatchToProps = () => ({})
const mapStateToProps = ({ balls }) => ({
  reduxBalls: balls.balls,
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayArea);
