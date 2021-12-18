import { combineReducers } from "@reduxjs/toolkit";

import nasaDataReducer from './nasaDataReducer';

const reducers = {
  nasaData: nasaDataReducer,
};

function createRootReducer() {
  const rootReducer = combineReducers({
    ...reducers,
  });

  return rootReducer;
}

export { createRootReducer };
