import 'aframe';
import Firebase from './Firebase';

AFRAME.registerComponent('player-emiter', {
  schema: {
    id: { type: 'string', default: '' },
  },
  init: function () {
    this.id = this.data.id;
    this.FireBase = {
      connection: Firebase,
      database: Firebase.database(),
    }
  },
  // update: function () {},
  tick: function () {
    if (!this.currentTick) {
      this.currentTick = 0;
    }
    this.currentTick++
    if (this.currentTick === 5) { // Small hack to increas MS between updates
      this.currentTick = 0
      const position = this.el.object3D.getWorldPosition();
      const rotation = this.el.object3D.getWorldRotation();
      writeUserPosition({
        database: this.FireBase.database,
        position,
        rotation,
        id: this.id,
      })
    }
  },
  // remove: function () {},
  // pause: function () {},
  // play: function () {}
});

const writeUserPosition = ({ database, position, rotation, id }) => {
  database.ref('users/' + id).set({ position, rotation, timestamp: Firebase.database.ServerValue.TIMESTAMP });
}

// const writeBallPosition = ({database, position, rotation, id}) => {
//   database.ref('ball/' + id).set({ position, rotation, timestamp: Firebase.database.ServerValue.TIMESTAMP });
// }
