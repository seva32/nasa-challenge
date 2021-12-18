import React, { ReactElement, useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../store/store";
import { selectNasaData } from "../store/reducers/nasaDataReducer";
import { NasaDataActionTypes } from "../store/actions/nasaDataActions";
import { ImageRenderer } from "../components";

interface Pics {
  id: number;
  url: string;
  thumbnail: string;
  aspectRatio: number;
}

interface Props {}

function Landing({}: Props): ReactElement {
  const [showPics, setShowPics] = useState<Pics[]>([]);
  const { photos, isFetching, error } = useAppSelector(selectNasaData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!photos || !photos?.length) {
      dispatch({ type: NasaDataActionTypes.GET_NASA_DATA });
    }
    if (photos.length) {
      const pics = [];
      for (let i = 0; i < 25; i++)
        pics.push({
          id: photos[i].id,
          url: photos[i].img_src,
          thumbnail: photos[i].img_src,
          aspectRatio: 1,
        });
      setShowPics(pics);
    }
  }, [photos, dispatch]);
  console.log(photos?.[0]);
  return (
    <div>
      {showPics.length &&
        showPics.map((data) => (
          <ImageRenderer
            key={data.id}
            url={data.url}
            thumb={data.thumbnail}
            aspectRatio={data.aspectRatio}
          />
        ))}
    </div>
  );
}

export default Landing;
