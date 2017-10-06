import 'aframe';
import 'super-hands';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { createBall } from '../../../../store/reducers/balls';
import CellphoneHUD from './CellPhoneHUD';

class PlayerAttacker extends Component {
  constructor(props) {
    super(props);
    this.onCellPhoneHUDPressed = this.onCellPhoneHUDPressed.bind(this);
  }

  onCellPhoneHUDPressed(position) {
    const { createBall, userID } = this.props;
    createBall({
      userID,
      position,
    })
  }

  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { lives, winner, userID } = this.props;
    return (
      <a-entity>
        <CellphoneHUD
          onCursorClicked={ this.onCellPhoneHUDPressed }
          lives={ lives }
          winner={ winner }
          userID={ userID }
        />
      </a-entity>
    );
  }
}

PlayerAttacker.defaultProps = {
  lives: 10,
  winner: true,
}

PlayerAttacker.propTypes = {
  createBall: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
  lives: PropTypes.number,
  winner: PropTypes.bool
}

const mapDispatchToProps = dispatch => ({
  createBall: data => dispatch(createBall(data)),
});

const mapStateToProps = ({ mainApp }) => ({
  userID: mainApp.userID,
})
export default connect(mapStateToProps, mapDispatchToProps)(PlayerAttacker);
