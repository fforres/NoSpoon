import 'aframe';
import WS from './ws';

AFRAME.registerComponent('player-emiter', {
  schema: {
    id: { type: 'string' },
    defender: { type: 'boolean' },
  },
  init () {
    this.id = this.data.id;
    this.WS = WS;
    this.currentTick = 0;
    this.userData = {
      id: this.data.id,
      isDefender: this.data.defender,
    };
    debugger;
  },
  // update: function () {},
  tick () {
    this.currentTick = this.currentTick + 1;
    if (this.currentTick === 10) { // Small hack to increas MS between updates
      this.currentTick = 0
      this.updateUserPos();
    }
  },
  updateUserPos () {
    // const user = this.el.object3D;
    // const { _x: x, _y: y, _z: z } = user.getWorldRotation();
    // const data = {
    //   type: 'userPosition',
    //   user: this.userData,
    //   position: { ...user.getWorldPosition() },
    //   rotation: { x, y, z },
    // };
    // this.WS.send(data);
    const user = this.el.object3D;
    const data = {
      type: 'userPosition',
      user: this.userData,
      position: { ...user.getWorldPosition() },
      rotation: { ...user.getWorldRotation() },
    };
    this.WS.send(data);
  },
});

AFRAME.registerComponent('bullet-emiter', {
  schema: {
    id: { type: 'string', default: '' },
  },
  init () {
    this.id = this.data.id;
    this.WS = WS;
    this.destroy = false;
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
        this.updatePosition({ ...position });
      }
    }
  },
  updatePosition ({ x = 0, y = 0, z = 0 }) {
    if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(z)) {
      return;
    }
    this.WS.send({
      type: 'bulletPosition',
      user: {
        id: this.id,
      },
      id: this.id,
      position: { x, y, z },
    });
  },
  deleteBall() {
    this.WS.send({
      type: 'deleteBall',
      id: this.id,
    })
  }
});
