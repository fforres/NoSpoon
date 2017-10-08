import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import Face from '../face';

class OtherPlayers extends Component {
  constructor(props) {
    super(props);
    this.getAttackersComponents = this.getAttackersComponents.bind(this);
  }

  getAttackersComponents() {
    const array = [];
    const { players } = this.props;
    console.log(players);
    Object.keys(players).forEach((player) => {
      const { rotation, position } = players[player];
      if (players[player] && rotation && position) {
        array.push(
          <Face
            id={ player }
            key={ player }
            name={ player }
            position={ position }
            rotation={ rotation }
          />
        );
      }
    });
    return array;
  }

  render() {
    return (
      <a-entity>
        { this.getAttackersComponents() }
      </a-entity>
    );
  }
}

OtherPlayers.propTypes = {
  players: PropTypes.object.isRequired,
}

const mapDispatchToProps = () => ({})
const mapStateToProps = ({ players }) => ({
  players: players.players,
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherPlayers);
