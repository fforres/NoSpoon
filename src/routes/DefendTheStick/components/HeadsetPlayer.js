import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import physics from 'aframe-physics-system';
import PlayerBody from './PlayerBody';
import HUD from './HUD';
physics.registerAll();

export default class HeasetPlayer extends Component {
  render(props) {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { removeLife, lives, loser } = props;
    return (
      <a-entity>
        <a-entity id="teleHand" hand-controls="left" mixin="controller" />
        <a-entity id="blockHand" hand-controls="right" mixin="controller" />
        <PlayerBody onColission={removeLife} />
        <HUD lives={lives} loser={loser} />
      </a-entity>
    );
  }
}
