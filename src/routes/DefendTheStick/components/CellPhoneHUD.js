import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import CANNON from 'cannon';
import physics from 'aframe-physics-system';
physics.registerAll();

class CellPhoneHUD extends Component {
  getPlayingHud = lives =>
    <a-entity
      geometry="primitive: plane; height: 0.3; width: 0.6"
      position="0.4 -0.4 -1"
      material="color: 0000FF; opacity: 0.5"
      text={[`align:center`, `color:white`, `value: Lives : ${lives}`].join(
        ';'
      )}
    />;

  LOOSER = lives => (
    <a-entity
      geometry="primitive: plane; height: 4; width: 4"
      position="0 0 -2"
      material="color: #FF0000; opacity: 0.7"
      text={[`align:center`, `color:white`, `value: YOU Win!!`].join(';')}
    />
  )
  render(props) {
    const { lives, winner, userID } = props;
    const hudContent = winner ? this.Winner() : this.getPlayingHud(lives);
    return (
      <a-entity camera position="0 2 -10" rotation="0 100 0" look-controls player-emiter={`id: ${userID}`}>
        {hudContent}
      </a-entity>
    );
  }
}

export default CellPhoneHUD;
