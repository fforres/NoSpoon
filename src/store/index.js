import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { autoRehydrate } from 'redux-persist';
// import { createLogger } from 'redux-logger';
import reducer from './reducers';

function configureStore(initialState = {}) {
  const middlewares = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.env.NODE_ENV !== 'production') {
    // middlewares.push(createLogger());
  }

  return createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares),
      // autoRehydrate()
    ),
  );
}

const store = configureStore();

export default store;
