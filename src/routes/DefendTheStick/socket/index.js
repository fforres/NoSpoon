import 'aframe';
import Firebase from './Firebase';

AFRAME.registerComponent('player-emiter', {
  schema: {
    id: { type: 'string', default: '' },
    defender: { type: 'boolean' },
  },
  init () {
    this.id = this.data.id;
    this.isDefender = this.data.defender;
    const newPosition = this.getRandomPosition();
    const rotationTowardsCenter = this.calculateRotationTowardsCenter(newPosition);
    this.el.setAttribute('position', newPosition); // position character randomly
    this.el.setAttribute('rotation', rotationTowardsCenter); // Rotate character so it faces the center of the arena

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
    this.currentTick++
    if (this.currentTick === 5) { // Small hack to increas MS between updates
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
      timestamp: Firebase.database.ServerValue.TIMESTAMP
    })
  },
  onUserDisconnects () {
    this.FireBase.userRef.onDisconnect().remove();
  },
  getRandomPosition () {
    const angle = Math.random() * Math.PI * 2;
    const radius = 10; // size of the play-area
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      y: 2,
    };
  },
  calculateRotationTowardsCenter ({ x, z }) {
    const angleRad = Math.atan((x / z));
    const angleDeg = (angleRad * 180 / Math.PI);
    const oldY = this.el.object3D.getWorldRotation()._y * 180 / Math.PI;
    console.log(oldY, angleDeg, oldY + 90 + angleDeg)
    return {
      x: 0,
      y: oldY + 90 + angleDeg,
      z: 0,
    }
  }
});
