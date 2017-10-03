import 'aframe';
import Firebase from './Firebase';
import './ws';

AFRAME.registerComponent('player-emiter', {
  schema: {
    id: { type: 'string', default: '' },
    defender: { type: 'boolean' },
  },
  init () {
    this.id = this.data.id;
    this.isDefender = this.data.defender;

    this.FireBase = {
      connection: Firebase,
      database: Firebase.database(),
      userRef: Firebase.database().ref(`users/${this.id}`),
    }
    this.onUserDisconnects();
  },
  // update: function () {},
  tick () {
    if (!this.currentTick) {
      this.currentTick = 0;
    }
    this.currentTick = this.currentTick + 1;
    if (this.currentTick === 2) { // Small hack to increas MS between updates
      this.currentTick = 0
      this.updateUserPos();
    }
  },
  updateUserPos () {
    const user = this.el.object3D;
    this.FireBase.userRef.set({
      isDefender: this.isDefender,
      position: user.getWorldPosition(),
      rotation: user.getWorldRotation(),
    })
  },
  onUserDisconnects () {
    this.FireBase.userRef.onDisconnect().remove();
  },
});

AFRAME.registerComponent('player-attacker', {
  dependencies: ['position'],
  schema: { type: 'vec3' },
  init () {
    const newPosition = this.getRandomPosition();
    this.el.setAttribute('position', newPosition); // position character randomly
    const rotationTowardsCenter = this.calculateRotationTowardsCenter(newPosition);
    // rotationTowardsCenter = 0;
    this.el.setAttribute('rotation', {
      x: 0,
      y: rotationTowardsCenter, // Rotate character so it faces the center of the arena
      z: 0,
    });
  },
  tick () {},

  calculateRotationTowardsCenter ({ x, z }) {
    const angleRad = Math.atan((x / z));
    const angleDeg = angleRad * 180;
    return angleDeg;
  },

  getRandomPosition () {
    const angle = Math.random() * Math.PI * 2;
    const radius = 11; // size of the play-area
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      y: 2,
    };
  },
});

AFRAME.registerComponent('player-defender', {
  schema: {},
  init () {},
  update () {},
  tick () {},
});
