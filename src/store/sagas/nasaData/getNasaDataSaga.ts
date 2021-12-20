import { call, put, takeLatest } from 'redux-saga/effects';
import { ResponseGenerator } from '../../../utils/common';

import { NasaDataActionTypes } from '../../actions/nasaDataActions';

import getNasaData from '../../../api/getNasaData';

interface GetNasaResponse {
  data: any;
}

const { GET_NASA_DATA, GET_NASA_DATA_FAILURE, GET_NASA_DATA_PENDING, GET_NASA_DATA_SUCCESS } =
  NasaDataActionTypes;

/**
 * Fetches NasaData via NasaDataService - Emits pending state, fetches data with request body
 * and dispatches action for success/error
 * @param {Object} payload - The request object
 */
export function* getNasaDataSaga(action: any) {
  yield put({ type: GET_NASA_DATA_PENDING });
  try {
    const response: ResponseGenerator<GetNasaResponse> = yield call(
      getNasaData,
      action.payload,
    );
    yield put({ type: GET_NASA_DATA_SUCCESS, payload: response.data });
  } catch (error: any) {
    console.error(error.message);
    yield put({ type: GET_NASA_DATA_FAILURE });
  }
}

export function* watchGetNasaDataRequest() {
  yield takeLatest(GET_NASA_DATA, getNasaDataSaga);
}
