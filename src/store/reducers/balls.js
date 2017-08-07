import Firebase from '../../routes/DefendTheStick/socket/Firebase';

const SET_BALLS = 'theMatrix/balls/SET_BALLS';
const REMOVE_BALLS = 'theMatrix/balls/REMOVE_BALLS';
const CLEAR = 'theMatrix/balls/CLEAR';

export const viewStates = ['init', 'loading', 'error', 'success'].reduce((obj, val) => ({ ...obj, [val]: val }), {});

const defaultState = {
  balls: {},
  status: viewStates.init,
};

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
  case SET_BALLS:
    return { ...state, balls: { ...state.balls, ...payload.balls } };
  case REMOVE_BALLS:
    return { ...state, balls: { ...state.balls } };
  case CLEAR:
    return defaultState;
  default:
    return state;
  }
}

export const setNewBalls = balls => ({ type: SET_BALLS, payload: { balls } });
export const connectBalls = () => dispatch => {
  // Firebase.database().ref('/balls').on('value', (snapshot) => {
  //   const users = snapshot.val();
  //   dispatch(setNewPlayers(users));
  // })
}

export const clear = () => ({ type: CLEAR });
