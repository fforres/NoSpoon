import { combineReducers } from 'redux';

import bulletsReducer from './bullets';
import playersReducer from './players';
import appReducer from './app';

const rootReducer = combineReducers({
  mainApp: appReducer,
  balls: bulletsReducer,
  players: playersReducer,
});

export default rootReducer;
