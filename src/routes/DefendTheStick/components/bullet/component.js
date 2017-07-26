import 'aframe';
import Firebase from '../../socket/Firebase';

AFRAME.registerComponent('bullet-emiter', {
  schema: {
    id: { type: 'string', default: '' },
    defender: { type: 'boolean' },
  },
  init () {
    this.id = this.data.id;
    this.isDefender = this.data.defender;
    this.FireBase = {
      ballRef: Firebase.database().ref(`balls/${this.id}`),
    }
    this.onDisconnect();
  },
  // update: function () {},
  tick () {
    if (!this.currentTick) {
      this.currentTick = 0;
    }
    this.currentTick++
    if (this.currentTick === 1) { // Small hack to increas MS between updates
      this.currentTick = 0
      this.updatePosition();
    }
  },
  updatePosition () {
    const ballElement = this.el.object3D;
    this.FireBase.ballRef.set({
      isDefender: this.isDefender,
      position: ballElement.getWorldPosition(),
      rotation: ballElement.getWorldRotation(),
      timestamp: Firebase.database.ServerValue.TIMESTAMP
    });
  },
  onDisconnect () {
    this.FireBase.ballRef.onDisconnect().remove();
  },
});
