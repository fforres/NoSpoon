import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import physics from 'aframe-physics-system';
physics.registerAll();

class HUD extends Component {
  getPlayingHud = lives => (
    <a-entity
      geometry="primitive: plane; height: 0.3; width: 0.6"
      position="0.4 -0.4 -1"
      material="color: #0000FF; opacity: 0.5"
      text={[`align:center`, `color:white`, `value: Lives : ${lives}`].join(
        ';'
      )}
    />
  )
  LOOSER = () => (
    <a-entity
      geometry="primitive: plane; height: 4; width: 4"
      position="0 0 -2"
      material="color: #FF0000; opacity: 0.7"
      text={[`align:center`, `color:white`, `value: YOU LOST!!`].join(';')}
    />
  )
  render(props) {
    const { lives, loser, userID } = props;
    const hudContent = loser ? this.LOOSER() : this.getPlayingHud(lives);
    return (
      <a-entity camera="userHeight: 1.6;" look-controls wasd-controls player-emiter={`id: ${userID}; defender: true;`} player-defender>
        {hudContent}
      </a-entity>
    );
  }
}

export default HUD;
