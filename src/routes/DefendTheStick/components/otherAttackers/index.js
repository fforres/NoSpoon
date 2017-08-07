import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Face from '../face';
import FireBase from '../../socket/Firebase';

class OtherAttackers extends Component {
  getAttackersComponents = () => {
    const array = [];
    const { players } = this.props;
    const { userID } = this.props;
    for (let key in players) {
      if (players.hasOwnProperty(key) && userID !== key) {
        const { rotation, position } = players[key];
        array.push(
          <Face
            id={key}
            position={position}
            rotation={rotation}
          />
        );
      }
    }
    return array;
  }
  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const attackers = this.getAttackersComponents();
    return (
      <a-entity>
        { attackers }
      </a-entity>
    );
  }
}

const mapDispatchToProps = () => ({})
const mapStateToProps = ({ players }) => ({
  players: players.players,
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherAttackers);
