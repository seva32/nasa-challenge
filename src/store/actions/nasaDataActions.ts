import { createAction } from '@reduxjs/toolkit';

import { NasaDataState } from '../reducers/nasaDataReducer';
import { withPayloadType } from '../../utils/utils';

export enum NasaDataActionTypes {
  GET_NASA_DATA = 'GET_NASA_DATA',
  GET_NASA_DATA_PENDING = 'GET_NASA_DATA_PENDING',
  GET_NASA_DATA_SUCCESS = 'GET_NASA_DATA_SUCCESS',
  GET_NASA_DATA_FAILURE = 'GET_NASA_DATA_FAILURE',
  CLEAR_NADA_DATA = 'CLEAR_NASA_DATA',
}

export const getNasaData = createAction(NasaDataActionTypes.GET_NASA_DATA, withPayloadType<NasaDataState>());
export const getNasaDataPending = createAction(NasaDataActionTypes.GET_NASA_DATA_PENDING, withPayloadType<NasaDataState>());
export const getNasaDataSuccess = createAction(NasaDataActionTypes.GET_NASA_DATA_SUCCESS, withPayloadType<NasaDataState>());
export const getNasaDataFailure = createAction(NasaDataActionTypes.GET_NASA_DATA_FAILURE, withPayloadType<NasaDataState>());
export const clearNasaData = createAction(NasaDataActionTypes.CLEAR_NADA_DATA, withPayloadType<NasaDataState>());
