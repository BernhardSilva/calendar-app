import { applyMiddleware, createStore } from 'redux';
import { compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducer/rootReducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
