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
  tick () {
    if (!this.currentTick) {
      this.currentTick = 0;
    }
    this.currentTick++
    if (this.currentTick === 2) { // Small hack to increas MS between updates
      this.currentTick = 0
      if (this.shouldEmit) {
        this.updatePosition();
      }
    }
  },
  updatePosition () {
    const ballElement = this.el.object3D;
    this.FireBase.ballRef.set({
      position: ballElement.getWorldPosition(),
      rotation: ballElement.getWorldRotation(),
      timestamp: Firebase.database.ServerValue.TIMESTAMP
    });
  },
  onDisconnect () {
    // this.FireBase.ballRef.onDisconnect().remove();
  },
});
