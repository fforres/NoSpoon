import 'aframe';
import CANNON from 'cannon';
import FireBase from '../../../../store/socket/Firebase';

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
    this.FireBase = FireBase.database().ref('balls');
    this.onDisconnect();
  },
  tick () {
    if (!this.destroy) {
      const position = this.el.object3D.getWorldPosition();
      if (!this.currentTick) {
        this.currentTick = 0;
      }
      this.currentTick = this.currentTick + 1;
      if (this.currentTick === 2) { // Small hack to increas MS between updates
        this.currentTick = 0;
        this.updatePosition(position);
      }
      const currentTime = new Date().getTime();
      if ((currentTime - this.creationTime) > 5000) { // 50000 miliseconds of life time to a bullet
        this.destroy = true;
      }
    } else {
      this.FireBase.remove();
    }
  },
  updatePosition ({ x = 0, y = 0, z = 0 }) {
    if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(z)) {
      return;
    }
    this.FireBase.child(this.id).set({
      position: { x, y, z },
      // timestamp,
    });
  },
  onDisconnect () {
    this.FireBase.onDisconnect().remove();
  },
});

AFRAME.registerComponent('position-redux', {
  schema: {
    x: { type: 'number' },
    y: { type: 'number' },
    z: { type: 'number' },
  },
  init() {
    this.id = this.el.attributes.id
    const { x, y, z } = this.data;
    this.el.setAttribute('position', `${x} ${y} ${z}`);
  },
  tick() {
    console.log(this.data);
    if (JSON.stringify(this.oldData) !== JSON.stringify(this.data)) {
      console.log(this.data)
      const { x, y, z } = this.data;
      this.el.setAttribute('position', `${x} ${y} ${z}`);
    }
  }
});
