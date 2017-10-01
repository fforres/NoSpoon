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
    this.creationTime = new Date().getTime();
    this.shouldEmit = this.data.shouldEmit;
    this.destroy = false;
    // this.FireBase = Firebase.database().ref(`balls/${this.id}`);
    this.FireBase = Firebase.database().ref('balls');
    this.onDisconnect();
  },
  tick () {
    if (!this.destroy) {
      if (!this.currentTick) {
        this.currentTick = 0;
      }
      this.currentTick = this.currentTick + 1;
      if (this.currentTick === 10) { // Small hack to increas MS between updates
        this.currentTick = 0
        this.updatePosition();
      }
      const currentTime = new Date().getTime();
      if ((currentTime - this.creationTime) > 5000) { // 50000 miliseconds of life time to a bullet
        this.destroy = true;
      }
    } else {
      this.FireBase.remove();
    }
  },
  updatePosition () {
    const ballElement = this.el.object3D;
    const position = ballElement.getWorldPosition();
    // const timestamp = Firebase.database.ServerValue.TIMESTAMP;
    this.FireBase.child(this.id).set({
      position,
      // timestamp,
    }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('uploaded', position, this.id);
      }
    });
  },
  onDisconnect () {
    this.FireBase.onDisconnect().remove();
  },
});
