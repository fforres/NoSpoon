import 'aframe';
import Firebase from './Firebase';

AFRAME.registerComponent('player-emiter', {
  schema: {
    id: { type: 'string', default: '' },
  },
  init () {
    this.id = this.data.id;
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
      position: user.getWorldPosition(),
      rotation: user.getWorldRotation(),
      timestamp: Firebase.database.ServerValue.TIMESTAMP
    })
  },
  onUserDisconnects () {
    this.FireBase.userRef.onDisconnect().remove();
  }
});
