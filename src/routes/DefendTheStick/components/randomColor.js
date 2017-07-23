import AFRAME from 'aframe';

AFRAME.registerComponent('random-color', {
  dependencies: ['material'], // so our material is not overwritten
  init() {
    this.el.setAttribute('material', 'color', getRandomColor());
  }
});

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
