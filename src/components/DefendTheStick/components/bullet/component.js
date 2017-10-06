import 'aframe';

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
