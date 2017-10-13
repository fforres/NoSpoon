import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HUD from './defenderHud';
import { fakeBulletCreator } from '../../../../store/reducers/bullets';
import { userMadeAPoint } from '../../../../store/reducers/app';

class PlayerDefender extends Component {


  componentDidMount() {
    setInterval(this.props.fakeBulletCreator, 1000);
  }


  render() {
    const { lives, loser, userID, userMadeAPoint } = this.props;
    return (
      <a-entity
        ID={ 'PLAYER_DEFENDER' }
      >
        { /* <a-entity id="teleHand" hand-controls="left" mixin="controller" />
        <a-entity id="blockHand" hand-controls="right" mixin="controller" /> */ }
        <a-entity class="right-controller" super-hands />
        <a-entity class="left-controller" super-hands />
        <HUD lives={ lives } loser={ loser } userID={ userID } onHit={ userMadeAPoint } />
      </a-entity>
    );
  }
}

PlayerDefender.defaultProps = {
  lives: 3,
  loser: false,
};

PlayerDefender.propTypes = {
  lives: PropTypes.number,
  loser: PropTypes.bool,
  userID: PropTypes.string.isRequired,
  userMadeAPoint: PropTypes.func.isRequired,
  fakeBulletCreator: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fakeBulletCreator: data => dispatch(fakeBulletCreator(data)),
  userMadeAPoint: data => dispatch(userMadeAPoint(data)),
});

const mapStateToProps = ({ mainApp }) => ({
  userID: mainApp.userID,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDefender);
