import 'aframe';

AFRAME.registerComponent('other-players-body', {
  schema: {
    position: { type: 'vec3' },
    rotation: { type: 'vec3' },
  },
  init () {},
  update () {
    // const { rotation, position } = this.data;
    // this.el.setAttribute('position', {
    //   x: position.x,
    //   y: position.y,
    //   z: position.z,
    // })
  },
  tick () {},
});
