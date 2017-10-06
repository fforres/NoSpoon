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
    const balls = { ...state.balls };
    delete balls[payload.id]; // TODO: Change for _.omit
    return { ...state, balls };
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
  const ballId = `${performance.now().toString().split('.').join('')}__${mainApp.userID}`
  WS.send({
    type: 'createBullet',
    id: ballId,
    user: {
      id: mainApp.userID,
      attacker: !mainApp.isDefender,
    },
    position: { ...position },
  })
};
export const connectBalls = () => (dispatch) => {
  WS.subscribe('createBullet', (data) => {
    dispatch(setNewBall({
      id: data.id,
      position: data.position,
    }));
  });
}

export const deleteBullet = ({ id }) => (dispatch) => {
  setTimeout(() => {
    dispatch(removeBall({ id }))
  }, 5000)
}

export const clear = () => ({ type: CLEAR });
