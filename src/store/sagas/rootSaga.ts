import { all, fork } from "redux-saga/effects";

import { watchGetNasaDataRequest } from "./nasaData/getNasaDataSaga";

function* rootSaga() {
  yield all([fork(watchGetNasaDataRequest)]);
}

export { rootSaga };
