import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HUD from './defenderHud';

export default class PlayerDefender extends Component {

  componentDidMount() {
    this.props.fakeBulletCreator();
  }

  render() {
    // const debug = process.env.NODE_ENV === 'development' ? 'debug: true' : '';
    const { lives, loser, userID } = this.props;
    return (
      <a-entity name={ 'PLAYER_DEFENDER' }>
        { /* <a-entity id="teleHand" hand-controls="left" mixin="controller" />
        <a-entity id="blockHand" hand-controls="right" mixin="controller" /> */ }
        <a-entity class="right-controller" super-hands />
        <a-entity class="left-controller" super-hands />
        <HUD lives={ lives } loser={ loser } userID={ userID } />
      </a-entity>
    );
  }
}

PlayerDefender.defaultProps = {
  lives: 3,
  loser: false,
}

PlayerDefender.propTypes = {
  fakeBulletCreator: PropTypes.func.isRequired,
  lives: PropTypes.number,
  loser: PropTypes.bool,
  userID: PropTypes.string.isRequired
}
