import Firebase from '../socket/Firebase';

const SET_PLAYERS = 'theMatrix/players/SET_PLAYERS';
const REMOVE_PLAYERS = 'theMatrix/players/REMOVE_PLAYERS';
const CLEAR = 'theMatrix/players/CLEAR';

export const viewStates = ['init', 'loading', 'error', 'success'].reduce((obj, val) => ({ ...obj, [val]: val }), {});

const defaultState = {
  players: {},
  status: viewStates.init,
};

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
  case SET_PLAYERS:
    return { ...state, players: { ...state.players, ...payload.players } };
  case REMOVE_PLAYERS:
    return { ...state, balls: { ...state.balls } };
  case CLEAR:
    return defaultState;
  default:
    return state;
  }
}

// export const connectPlayers = () => ({ type: CONNECT_PLAYERS });
export const setNewPlayers = players => ({ type: SET_PLAYERS, payload: { players } });

export const connectPlayers = () => (dispatch) => {
  Firebase.database().ref('/users').on('value', (snapshot) => {
    const users = snapshot.val();
    dispatch(setNewPlayers(users));
  })
}

export const clear = () => ({ type: CLEAR });
