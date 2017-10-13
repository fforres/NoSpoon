import { omit } from 'lodash';
import CANNON from 'cannon';
import WS from '../socket/ws';

const SET_BALL = 'theMatrix/bullets/SET_BALL';
const REMOVE_BALL = 'theMatrix/bullets/REMOVE_BALL';
const CLEAR = 'theMatrix/bullets/CLEAR';

export const viewStates = ['init', 'loading', 'error', 'success'].reduce((obj, val) => ({ ...obj, [val]: val }), {});

const defaultState = {
  balls: {},
  status: viewStates.init,
};

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
  case SET_BALL:
    return {
      ...state,
      balls: {
        ...state.balls,
        [payload.id]: {
          owner: payload.userId,
          position: payload.position,
          impulse: payload.impulse,
        }
      }
    };
  case REMOVE_BALL: {
    return {
      ...state,
      balls: { ...omit(state.balls, payload.id) },
    };
  }
  case CLEAR:
    return defaultState;
  default:
    return state;
  }
}

export const setNewBall = data => ({ type: SET_BALL, payload: data });

export const removeBall = data => ({ type: REMOVE_BALL, payload: data });

export const createBall = ({ position, impulse }) => (dispatch, getState) => {
  const { mainApp } = getState();
  const id = `${performance.now().toString().split('.').join('')}__${mainApp.userID}`;
  dispatch(setNewBall({
    id,
    userId: mainApp.userID,
    position,
    impulse
  }));

  WS.send({
    type: 'createBullet',
    id,
    user: {
      id: mainApp.userID,
      attacker: !mainApp.isDefender,
    },
    position: { ...position },
    impulse: { ...impulse },
  });
};

export const fakeBulletCreator = () => (dispatch) => {
  if (true) {
    return;
  }

  const data = {
    type: 'createBullet',
    user: {
      id: 'user-9659250000000001',
      attacker: true,
    },
  };

  const crossHairVec = new CANNON.Vec3(0, 1.5, 0);
  const position = {
    x: 0,
    y: 2,
    z: -8,
  };
  const position1Vec = new CANNON.Vec3(position.x, position.y, position.z);

  const impulse = position1Vec.vsub(crossHairVec);
  impulse.normalize();
  impulse.scale(5, impulse);

  dispatch(createBall({
    position,
    impulse,
  }));

};

export const connectBullets = () => (dispatch) => {
  WS.subscribe('createBullet', ({ id, user, position, impulse }) => {
    dispatch(setNewBall({ id, position, impulse, userId: user.id }));
  });
  WS.subscribe('bulletPosition', (data) => {
    console.log(data);
    // dispatch(setNewBall({
    //   id: data.id,
    //   position: data.position,
    // }));
  });
};

export const deleteBullet = ({ id }) => (dispatch) => {
  setTimeout(() => {
    dispatch(removeBall({ id }));
  }, 10000);
};

export const clear = () => ({ type: CLEAR });
