import AFRAME from 'aframe';

AFRAME.registerComponent('random-color', {
  dependencies: ['material'], // so our material is not overwritten
  init() {
    console.log(this);
    this.el.setAttribute('material', 'color', 'red');
  }
});

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
