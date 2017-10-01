import 'aframe';
import 'super-hands';
import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import Face from '../face';

class OtherAttackers extends Component {
  constructor(props) {
    super(props);
    this.getAttackersComponents = this.getAttackersComponents.bind(this);
  }

  getAttackersComponents() {
    const array = [];
    const { players } = this.props;
    const { userID } = this.props;
    Object.keys(players).forEach((player) => {
      const { rotation, position } = players[player];
      array.push(
        <Face
          id={ player }
          name={ player }
          key={ player }
          position={ position }
          rotation={ rotation }
        />
      );
    });
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

OtherAttackers.propTypes = {
  userID: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    rotation: PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.string,
      z: PropTypes.string,
    }),
  })).isRequired
}

const mapDispatchToProps = () => ({})
const mapStateToProps = ({ players }) => ({
  players: players.players,
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherAttackers);
