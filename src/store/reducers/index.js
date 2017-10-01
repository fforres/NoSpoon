import { combineReducers } from 'redux';

import ballsReducer from './balls';
import playersReducer from './players';
import firebaseReducer from './firebase';

const rootReducer = combineReducers({
  mainApp: firebaseReducer,
  balls: ballsReducer,
  players: playersReducer,
});

export default rootReducer;
