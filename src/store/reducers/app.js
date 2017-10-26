import { throttle } from 'lodash';
import WS from '../socket/ws';
import { getDisplay } from '../../components/DefendTheStick/components/helpers';
import { removeBall } from './bullets';

const CREATE_CURRENT_PLAYER = 'theMatrix/currentPlayer/CREATE_CURRENT_PLAYER';
const ADD_POINT = 'theMatrix/currentPlayer/ADD_POINT';
const READY = 'theMatrix/currentPlayer/READY';
const CLEAR = 'theMatrix/currentPlayer/CLEAR';
const SET_WINNER = 'theMatrix/currentPlayer/SET_WINNER';

const defaulState = {
  points: 0,
  isDefender: false,
  loser: false,
  userID: '',
  isReady: false,
  winner: {
    id: '',
    userName: '',
  },
  userName: '',
};

export default function reducer(state = defaulState, { type, payload }) {
  switch (type) {
  case CREATE_CURRENT_PLAYER:
    return { ...state, ...payload.player, isReady: false };
  case READY:
    return { ...state, isReady: payload.isReady, isHeadSet: payload.isHeadSet };
  case ADD_POINT:
    return { ...state, points: payload.points };
  case SET_WINNER: {
    return { ...state, winner: { ...payload } };
  }
  case CLEAR:
    return defaulState;
  default:
    return state;
  }
}

export const setWinner = payload => ({ type: SET_WINNER, payload });

export const setReady = payload => ({ type: READY, payload });

export const setLives = payload => ({ type: ADD_POINT, payload });

export const userMadeAPoint = ({ bulletId }) => (dispatch, getState) => {
  const bullet = getState().balls.balls[bulletId];
  const userId = bullet.owner;
  if (userId) {
    debouncedWSUserMadeAPoint({ userId, bulletId, dispatch });
  }
};

const WSUserMadeAPoint = ({ userId, bulletId, dispatch }) => {
  WS.send({
    type: 'userMadeAPoint',
    user: {
      id: userId,
    },
  });
  dispatch(removeBall({ id: bulletId }));
};
const debouncedWSUserMadeAPoint = throttle(
  (...args) => WSUserMadeAPoint(...args),
  1500, // 1 Seconds of immortality because reaons
);


export const createCurrentPlayer = (userName) => {
  const defender = new URL(window.location.href).searchParams.get('defender');
  const player = {
    points: 0,
    isDefender: !!(defender === 'true'),
    loser: false,
    userName,
    userID: `user-${performance.now().toString().split('.').join('')}`,
  };

  if (player.isDefender) {
    WS.send({
      type: 'RESET',
    });
  }

  WS.send({
    type: 'identifyUser',
    user: {
      id: player.userID,
      isDefender: player.isDefender,
      userName,
    },
  });

  return { type: CREATE_CURRENT_PLAYER, payload: { player } };
};


export const isPlayerReady = ({ userName }) => (dispatch, getState) => {

  WS.subscribe('userMadeAPoint', ({ user }) => {
    const { id } = user;
    if (getState().mainApp.userID === id) {
      // add point to myself
      dispatch(setLives({ points: getState().mainApp.points + 1 }));
    }
  });

  WS.subscribe('userWon', ({ user }) => {
    dispatch(setWinner({
      id: user.id,
      userName: user.userName,
    }));
  });

  WS.subscribe('identifyUser', () => {
    getDisplay()
      .then((isHeadSet) => {
        dispatch(setReady({ isHeadSet, isReady: true }));
      });
  });

  WS.onOpen(() => {
    dispatch(createCurrentPlayer(userName));
  });

};
