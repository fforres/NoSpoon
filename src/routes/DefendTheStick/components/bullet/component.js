import 'aframe';
import CANNON from 'cannon';
import Firebase from '../../socket/Firebase';

AFRAME.registerComponent('bullet-emiter', {
  schema: {
    id: { type: 'string', default: '' },
    shouldEmit: { type: 'boolean' },
  },
  init () {
    this.id = this.data.id;
    this.shouldEmit = this.data.shouldEmit;
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
      if (this.shouldEmit) {
        // this.updatePosition();
      }
    }
  },
  updatePosition () {
    const ballElement = this.el.object3D;
    this.FireBase.ballRef.set({
      position: this.el.object3D.getWorldPosition(),
      rotation: this.el.object3D.getWorldRotation(),
      timestamp: Firebase.database.ServerValue.TIMESTAMP
    });
  },
  onDisconnect () {
    // this.FireBase.ballRef.onDisconnect().remove();
  },
});
