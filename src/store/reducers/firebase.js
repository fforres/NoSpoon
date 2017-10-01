const CREATE_CURRENT_PLAYER = 'theMatrix/currentPlayer/CREATE_CURRENT_PLAYER';
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
    return { ...state, ...payload.player, isReady: true };
  case CLEAR:
    return defaulState;
  default:
    return state;
  }
}

export const createCurrentPlayer = () => {
  const defender = new URL(window.location.href).searchParams.get('defender');
  const player = {
    startingLives: 10,
    timeStart: Date.now(),
    isDefender: !!(defender === 'true'),
    loser: false,
    userID: `user-${performance.now().toString().split('.').join('')}`,
  };

  return { type: CREATE_CURRENT_PLAYER, payload: { player } };
};
