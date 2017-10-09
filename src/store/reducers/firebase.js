import WS from '../socket/ws';
import { getDisplay } from '../../components/DefendTheStick/components/helpers';

const CREATE_CURRENT_PLAYER = 'theMatrix/currentPlayer/CREATE_CURRENT_PLAYER';
const READY = 'theMatrix/currentPlayer/READY';
const CLEAR = 'theMatrix/currentPlayer/CLEAR';

const defaulState = {
  startingLives: 10,
  timeStart: null,
  isDefender: false,
  loser: false,
  userID: null,
  isReady: false,
};

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
  case CREATE_CURRENT_PLAYER:
    return { ...state, ...payload.player, isReady: false };
  case READY:
    return { ...state, isReady: payload.isReady, isHeadSet: payload.isHeadSet };
  case CLEAR:
    return defaulState;
  default:
    return state;
  }
}

export const setReady = payload => ({ type: READY, payload });


export const createCurrentPlayer = () => {
  const defender = new URL(window.location.href).searchParams.get('defender');
  const player = {
    startingLives: 10,
    timeStart: Date.now(),
    isDefender: !!(defender === 'true'),
    loser: false,
    userID: `user-${performance.now().toString().split('.').join('')}`,
  };

  WS.send({
    type: 'identifyUser',
    user: {
      id: player.userID,
      isDefender: player.isDefender,
    },
  });

  return { type: CREATE_CURRENT_PLAYER, payload: { player } };
};

export const isPlayerReady = () => (dispatch) => {
  WS.subscribe('identifyUser', () => {
    getDisplay()
      .then((isHeadSet) => {
        dispatch(setReady({ isHeadSet, isReady: true }));
      });
  });

  WS.onOpen(() => {
    dispatch(createCurrentPlayer());
  });

};
