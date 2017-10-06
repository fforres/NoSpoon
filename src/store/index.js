import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
// import { autoRehydrate } from 'redux-persist';
// import { createLogger } from 'redux-logger';
import reducer from './reducers';

function configureStore(initialState = {}) {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    // middlewares.push(createLogger());
  }

  return createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares),
    )
  );
}

const store = configureStore();

export default store;
