// import Firebase from '../socket/Firebase';
import { omit } from 'lodash';
import WS from '../socket/ws';

const SET_PLAYER = 'theMatrix/players/SET_PLAYER';
const REMOVE_PLAYER = 'theMatrix/players/REMOVE_PLAYER';
const CLEAR = 'theMatrix/players/CLEAR';
const ADD_POINTS = 'theMatrix/players/ADD_POINTS';

export const viewStates = ['init', 'loading', 'error', 'success'].reduce((obj, val) => ({ ...obj, [val]: val }), {});

const defaultState = {
  players: {},
  status: viewStates.init,
};

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
  case SET_PLAYER:
    return {
      ...state,
      players: {
        ...state.players,
        [payload.id]: {
          id: payload.id,
          points: state.players[payload.id] ? parseInt(state.players[payload.id].points, 10) : 0,
          userName: payload.userName,
          position: payload.position,
          rotation: payload.rotation,
          timeStamp: performance.now(),
        }
      }
    };
  case ADD_POINTS:
    return {
      ...state,
      players: {
        ...state.players,
        [payload.id]: {
          ...state.players[payload.id],
          points: parseInt(state.players[payload.id].points, 10) + 1,
          timeStamp: performance.now(),
        }
      }
    };
  case REMOVE_PLAYER:
    return { ...state, players: { ...omit(state.players, payload.id) } };
  case CLEAR:
    return defaultState;
  default:
    return state;
  }
}

export const addPoints = payload => ({ type: ADD_POINTS, payload });
export const setNewPlayer = payload => ({ type: SET_PLAYER, payload });
export const deletePlayer = payload => ({ type: REMOVE_PLAYER, payload });

export const connectPlayers = () => (dispatch, getState) => {
  WS.subscribe('userPosition', (data) => {
    const newPlayer = {
      id: data.user.id,
      userName: data.user.userName,
      position: data.position,
      rotation: data.rotation,
    };
    dispatch(setNewPlayer(newPlayer));
  });

  WS.subscribe('userDisconnected', ({ user }) => {
    dispatch(deletePlayer({ id: user.id }));
  });

  WS.subscribe('userMadeAPoint', ({ user }) => {
    const { id } = user;
    if (!getState().players.players[id]) {
      return;
    }
    dispatch(addPoints({ id: user.id }));
  });

  WS.subscribe('userWon', ({ id }) => {
    if (getState().mainApp.userID === id) {
      window.alert(`Ganaste!!: ${getState().mainApp.userName}`); // eslint-disable-line no-alert
      return;
    }
    window.alert(`Ganador: ${getState().players.players[id].userName}`); // eslint-disable-line no-alert
  });

  setInterval(() => {
    Object.keys(getState().players.players).forEach((player) => {
      const { players } = getState().players;
      if (players[player]) {
        if (performance.now() - players[player].timeStamp > 4000) {
          // dispatch(deletePlayer({ id: players[player].id }));
        }
      }
    });
  }, 2000);
};

export const clear = () => ({ type: CLEAR });
