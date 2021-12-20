import { createReducer } from '@reduxjs/toolkit';

import {
  getNasaDataPending,
  getNasaDataSuccess,
  getNasaDataFailure,
  clearNasaData,
} from '../actions/nasaDataActions';
import { RootState } from '../store';

type Camera = {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

type Rover = {
  id: number;
  landing_date: string;
  launch_date: string;
  name: string;
  status: string;
}

type Photo = {
  id: number;
  img_src: string;
  sol: number;
  earth_date: string;
  camera: Camera;
  rover: Rover;
}

export interface NasaDataState {
  photos: Photo[];
  isFetching: boolean;
  error: string;
}

export const initialState: NasaDataState = {
  photos: [],
  isFetching: false,
  error: '',
};

const nasaDataReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getNasaDataPending, (state) => {
      state.isFetching = true;
    })
    .addCase(getNasaDataSuccess, (state, { payload }) => {
      state.isFetching = false;
      state.photos = payload.photos;
      state.error = '';
    })
    .addCase(getNasaDataFailure, (state) => {
      state.isFetching = false;
      state.error = "Error loading data.";
    })
    .addCase(clearNasaData, (state) => {
      state = initialState;
    })
);

export function selectNasaData(state: RootState): NasaDataState {
  const { nasaData } = state;
  return nasaData;
}

export default nasaDataReducer;
