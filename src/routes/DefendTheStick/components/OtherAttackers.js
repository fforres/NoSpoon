import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import Face from '../../../components/face';
import FireBase from '../socket/Firebase';

export default class CellphonePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    FireBase.database().ref('/users').on('value', (snapshot) => {
      this.setState({
        usersInfo: snapshot.val(),
      });
    })
  }

  getAttackersComponents = () => {
    const array = [];
    const { usersInfo } = this.state;
    const { userID } = this.props;
    for (let key in this.state.usersInfo) {
      console.log(userID, key);
      if (usersInfo.hasOwnProperty(key) && userID !== key) {
        const { rotation, position } = usersInfo[key];
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
