import 'aframe';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import Face from '../face';

class OtherPlayers extends Component {
  constructor(props) {
    super(props);
    this.getOtherPlayers = this.getOtherPlayers.bind(this);
  }

  getOtherPlayers() {
    const array = [];
    const { players } = this.props;
    Object.keys(players).forEach((player) => {
      const { rotation, position, points, id, userName } = players[player];
      array.push(
        <Face
          id={ id }
          key={ id }
          name={ userName }
          points={ points }
          position={ position }
          rotation={ rotation }
        />
      );
    });
    return array;
  }

  render() {
    const attackerComponents = this.getOtherPlayers();
    return (
      <a-entity>
        { attackerComponents }
      </a-entity>
    );
  }
}

OtherPlayers.propTypes = {
  players: PropTypes.object.isRequired,
};

const mapDispatchToProps = () => ({});
const mapStateToProps = ({ players }) => ({
  players: players.players,
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherPlayers);
