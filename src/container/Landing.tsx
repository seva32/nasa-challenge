import React, { ReactElement, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../store/store";
import { selectNasaData } from "../store/reducers/nasaDataReducer";
import { NasaDataActionTypes } from "../store/actions/nasaDataActions";

interface Props {}

function Landing({}: Props): ReactElement {
  const { photos, isFetching, error } = useAppSelector(selectNasaData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!photos || !photos?.length) {
      dispatch({ type: NasaDataActionTypes.GET_NASA_DATA });
    }
  }, [photos]);
  return <div>Landing</div>;
}

export default Landing;
