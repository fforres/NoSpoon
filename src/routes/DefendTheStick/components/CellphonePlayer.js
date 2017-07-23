import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import CANNON from 'cannon';
import physics from 'aframe-physics-system';
import PlayerBody from './PlayerBody';
import CellphoneHUD from './CellphoneHUD';
physics.registerAll();

export default class CellphonePlayer extends Component {
  render(props) {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { lives, loser, userID } = this.props;
    return (
      <a-entity>
        <CellphoneHUD lives={lives} loser={loser} userID={userID} />
      </a-entity>
    );
  }
}
