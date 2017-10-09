import { omit } from 'lodash';
import WS from '../socket/ws';

const SET_BALL = 'theMatrix/balls/SET_BALL';
const REMOVE_BALL = 'theMatrix/balls/REMOVE_BALL';
const CLEAR = 'theMatrix/balls/CLEAR';

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

export const fakeBulletCreator = () => () => {
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

  const data1 = {
    ...data,
    id: `${performance.now().toString().split('.').join('')}`,
    position: {
      x: -5.745240321559881,
      y: 3.1151000523958334,
      z: 6.922302134402269,
    }
  };
  const data2 = {
    ...data,
    id: `${performance.now().toString().split('.').join('')}`,
    position: {
      x: -5.745240321559881,
      y: 3.1151000523958334,
      z: -6.922302134402269,
    }
  };
  const data3 = {
    ...data,
    id: `${performance.now().toString().split('.').join('')}`,
    position: {
      x: 5.745240321559881,
      y: 3.1151000523958334,
      z: 6.922302134402269,
    }
  };
  const data4 = {
    ...data,
    id: `${performance.now().toString().split('.').join('')}`,
    position: {
      x: 5.745240321559881,
      y: 3.1151000523958334,
      z: -6.922302134402269,
    }
  };
  WS.send(data1);
  WS.send(data2);
  WS.send(data3);
  WS.send(data4);

};

export const connectBalls = () => (dispatch) => {
  WS.subscribe('createBullet', (data) => {
    dispatch(setNewBall({
      id: data.id,
      position: data.position,
      impulse: data.impulse,
    }));
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
  }, 2000);
};

export const clear = () => ({ type: CLEAR });
