/* istanbul ignore file */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { createRootReducer } from './reducers/rootReducer';
import { NasaDataState } from './reducers/nasaDataReducer';
import { rootSaga } from './sagas/rootSaga';

export type ApplicationState = {
  nasaData: NasaDataState;
};

let store: any;

function configureAppStore(initialState: ApplicationState) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;
  const middlewares = [sagaMiddleware];
  const enhancers = [
    createInjectorsEnhancer({
      createReducer: createRootReducer,
      runSaga,
    }),
  ];
  store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });
  sagaMiddleware.run(rootSaga);
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers/rootReducer',
  //     () => store.replaceReducer(createRootReducer()));
  // }

  return store;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export function useAppDispatch(): AppDispatch {
  return useDispatch<AppDispatch>();
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { configureAppStore };
