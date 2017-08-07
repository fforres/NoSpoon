// News Feed (tribe) view
const SET_PLAYERS = 'theMatrix/players/SET_PLAYERS';
const ADD_PLAYER = 'theMatrix/players/ADD_PLAYER';
const REMOVE_PLAYERS = 'theMatrix/players/REMOVE_PLAYERS';
const CONNECT_PLAYERS = 'theMatrix/players/CONNECT_PLAYERS';
const CLEAR = 'theMatrix/players/CLEAR';

export const viewStates = ['init', 'loading', 'error', 'success'].reduce((obj, val) => ({ ...obj, [val]: val }), {});

const defaultState = {
  players: {},
  status: viewStates.init,
};

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
  case SET_PLAYERS:
    return { ...state, balls: { ...state.balls } };
  case ADD_PLAYER:
    return { ...state, balls: { ...state.balls } };
  case CLEAR:
    return defaultState;
  default:
    return state;
  }
}

export const connectPlayers = () => ({ type: CONNECT_PLAYERS });
export const setNewBalls = players => ({ type: SET_PLAYERS, payload: { players } });

export const clear = () => ({ type: CLEAR });
