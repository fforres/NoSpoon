import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import HUD from './HUD';

export default class HeadsetPlayer extends Component {
  render(props) {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { lives, loser, userID } = props;
    return (
      <a-entity>
        <a-entity id="teleHand" hand-controls="left" mixin="controller" />
        <a-entity id="blockHand" hand-controls="right" mixin="controller" />
        <HUD lives={ lives } loser={ loser } userID={ userID } />
      </a-entity>
    );
  }
}
