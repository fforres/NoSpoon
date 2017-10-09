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
        }
      }
    };
  case REMOVE_BALL: {
    return {
      ...state,
      balls: { ...omit(state.balls, payload.id) },
    }
  }
  case CLEAR:
    return defaultState;
  default:
    return state;
  }
}

export const setNewBall = ({ id, position }) => ({ type: SET_BALL, payload: { id, position } });

export const removeBall = ({ id }) => ({ type: REMOVE_BALL, payload: { id } });

export const createBall = ({ position }) => (dispatch, getState) => {
  const { mainApp } = getState();
  const id = `${performance.now().toString().split('.').join('')}__${mainApp.userID}`
  dispatch(setNewBall({
    id,
    position,
  }));

  WS.send({
    type: 'createBullet',
    id,
    user: {
      id: mainApp.userID,
      attacker: !mainApp.isDefender,
    },
    position: { ...position },
  })
};

export const fakeBulletCreator = () => () => {
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
  WS.send(data1)
  WS.send(data2)
  WS.send(data3)
  WS.send(data4)

};

export const connectBalls = () => (dispatch, getState) => {
  const { mainApp } = getState();
  if (mainApp.isDefender) {
    WS.subscribe('createBullet', (data) => {
      dispatch(setNewBall({
        id: data.id,
        position: data.position,
      }));
    });
  } else {
    WS.subscribe('bulletPosition', (data) => {
      console.log(data)
      // dispatch(setNewBall({
      //   id: data.id,
      //   position: data.position,
      // }));
    })
  }
}

export const deleteBullet = ({ id }) => (dispatch) => {
  setTimeout(() => {
    dispatch(removeBall({ id }))
  }, 2000)
}

export const clear = () => ({ type: CLEAR });
