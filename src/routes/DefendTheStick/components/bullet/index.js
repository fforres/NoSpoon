import 'aframe';
import { h, Component } from 'preact';
import './component';

export default class Bullet extends Component {
  render(props) {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { id } = props;
    console.log('creating ', id, ' ball');
    return (
      <a-entity
        id={id}
        key={id}
        geometry="primitive: sphere; radius: 0.3"
        material="color: red"
        position="0 3 0"
        dynamic-body
        random-color
      />
    );
  }
}
