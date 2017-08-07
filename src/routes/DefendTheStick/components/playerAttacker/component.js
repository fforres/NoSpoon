import 'aframe';

AFRAME.registerComponent('ball-creator', {
  schema: {
    id: { type: 'string', default: '' },
    defender: { type: 'boolean' },
  },
  init () {
    this.id = this.data.id;
    this.isDefender = this.data.defender;
    this.el.addEventListener('click', (evt) => {
      console.log(evt)
    });
  },
});
