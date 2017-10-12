import 'aframe';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CANNON from 'cannon';
import PropTypes from 'prop-types';
import { deleteBullet } from '../../../../store/reducers/bullets';

class AttackerBullet extends Component {

  constructor(props) {
    super(props);
    this.bodyLoaded = this.bodyLoaded.bind(this);
  }

  componentDidMount() {
    this.bullet.addEventListener('body-loaded', () => {
      requestAnimationFrame(this.bodyLoaded);
    });
    const { deleteBullet, name } = this.props;
    deleteBullet({ id: name });
  }

  componentWillUnmount() {
    if (this.functionReferenceToRemove) {
      this.bullet.removeEventListener('body-loaded');
    }
  }

  bodyLoaded() {
    if (this.bullet) {
      const { position, impulse } = this.props;
      const directionVector = new CANNON.Vec3(-impulse.x, -impulse.y, -impulse.z);
      const bulletVector = new CANNON.Vec3(position.x, position.y, position.z);
      this.bullet.body.applyImpulse(directionVector, bulletVector);
    }
  }

  render() {
    const { name, position } = this.props;
    const { x, y, z } = position;
    return (
      <a-sphere
        grabbable
        ref={ (c) => { this.bullet = c; } }
        id={ name }
        key={ name }
        name={ 'defender bullet' }
        dynamic-body={ 'angularDamping: 0.1; mass: 1; linearDamping: 0.2;' }
        geometry="primitive: sphere; radius: 0.2;"
        material="color: blue"
        position={ `${x} ${y} ${z}` }
        bullet-emiter={ `id: ${name}` }
      />
    );
  }

}

AttackerBullet.propTypes = {
  name: PropTypes.string.isRequired,
  deleteBullet: PropTypes.func.isRequired,
  impulse: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteBullet: ({ id }) => dispatch(deleteBullet({ id })),
});

export default connect(null, mapDispatchToProps)(AttackerBullet);
