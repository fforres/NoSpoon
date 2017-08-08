import 'aframe';
import { h, Component } from 'preact';

class CellPhoneHUD extends Component {
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

  Winner = () => (
    <a-entity
      geometry="primitive: plane; height: 4; width: 4"
      position="0 0 -2"
      material="color: #FF0000; opacity: 0.7"
      text={[`align:center`, `color:white`, `value: YOU Win!!`].join(';')}
    />
  )

  onClick = (e) => {
    this.props.onCursorClicked(e.detail.intersection.point);
  }

  render(props) {
    const { lives, winner, userID } = props;
    const hudContent = winner ? this.Winner() : this.getPlayingHud(lives);
    return (
      <a-entity
        camera
        position="0 2 -10"
        rotation="0 0 0"
        player-emiter={`id: ${userID}`}
        look-controls
        player-attacker
      >
        <a-entity
          ref={c => { this.bulletCreator = c }}
          onClick={this.onClick}
          raycaster="objects: #bulletCreator"
          cursor="fuse: false"
          position="0 0 -1"
          geometry="primitive: ring; radius-inner: 0.01; radius-outer: 0.011;"
          material="color: rgba(200, 100, 100, 0.5); shader: flat"
        />
        {hudContent}
      </a-entity>
    );
  }
}

export default CellPhoneHUD;
