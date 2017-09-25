import 'aframe';
import 'super-hands';
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { createBall } from '../../../../store/reducers/balls';
import CellphoneHUD from './CellPhoneHUD';

class CellphonePlayer extends Component {
  onCellPhoneHUDPressed = (position) => {
    const { createBall, userID } = this.props;
    createBall({
      userID,
      position,
      impulse: [10, 10, 2],
    })
  }

  render(props) {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { lives, winner, userID } = props;
    return (
      <a-entity>
        <CellphoneHUD
          onCursorClicked={this.onCellPhoneHUDPressed}
          lives={lives}
          winner={winner}
          userID={userID}
        />
      </a-entity>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createBall: (data) => dispatch(createBall(data)),
})
const mapStateToProps = ({ mainApp }) => ({
  userID: mainApp.userID,
})
export default connect(mapStateToProps, mapDispatchToProps)(CellphonePlayer);
