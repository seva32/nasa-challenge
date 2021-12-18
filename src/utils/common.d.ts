/* eslint-disable one-var */
import { NasaDataActionTypes } from 'store/actions/nasaDataActions';

const {
  GET_NASA_DATA,
  GET_NASA_DATA_PENDING,
  GET_NASA_DATA_SUCCESS,
  GET_NASA_DATA_FAILURE,
} = NasaDataActionTypes;

export interface ResponseGenerator<Data> {
  config?: any;
  data: Data;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export type GetNasaData = Action<typeof GET_NASA_DATA, string>;
export type GetNasaDataPending = Action<typeof GET_NASA_DATA_PENDING, string>;
export type GetNasaDataSuccess = Action<typeof GET_NASA_DATA_SUCCESS, string>;
export type GetNasaDataFailure = Action<typeof GET_NASA_DATA_FAILURE, string>;
