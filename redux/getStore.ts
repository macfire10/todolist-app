import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';
import { reducer } from './reducer';

export function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const getMiddleware = () => {
    if (process.env.NODE_ENV === 'development') {
      return applyMiddleware(sagaMiddleware);
    }
    return applyMiddleware(sagaMiddleware);
  };

  const store = createStore(
    reducer,
    initialState,
    getMiddleware(),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}