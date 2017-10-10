import 'aframe';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CANNON from 'cannon';
import PropTypes from 'prop-types';
import { deleteBullet, fakeBulletCreator } from '../../../../store/reducers/bullets';

class AttackerBullet extends Component {

  constructor(props) {
    super(props);
    this.worldOrigin = new CANNON.Vec3(0, Math.random() * 2.5, 0);
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
    setTimeout(this.props.fakeBulletCreator, 10000);
  }

  bodyLoaded() {
    if (this.bullet) {
      const { directionV, bulletV } = this.props.impulse;
      const directionVector = new CANNON.Vec3(directionV.x, directionV.y, directionV.z);
      const bulletVector = new CANNON.Vec3(bulletV.x, bulletV.y, bulletV.z);
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
        dynamic-body={ 'angularDamping: 1' }
        radius="0.1"
        geometry="primitive: sphere; radius: 0.1;"
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
  fakeBulletCreator: PropTypes.func.isRequired,
  impulse: PropTypes.shape({
    directionV: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
    }).isRequired,
    bulletV: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number,
    }).isRequired
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  fakeBulletCreator: () => dispatch(fakeBulletCreator()),
  deleteBullet: ({ id }) => dispatch(deleteBullet({ id })),
});

export default connect(null, mapDispatchToProps)(AttackerBullet);
