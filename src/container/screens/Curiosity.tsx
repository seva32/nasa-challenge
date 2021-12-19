import React, { ReactElement, useEffect, useState } from "react";

import { Pics, ImageGrid } from "../../components";

import { useAppSelector, useAppDispatch } from "../../store/store";
import { selectNasaData } from "../../store/reducers/nasaDataReducer";
import { NasaDataActionTypes } from "../../store/actions/nasaDataActions";

import { ReactComponent as Hero } from "../../assets/Hero.svg";
import CurText from "../../assets/cur-copy.png";

import "./curiosity.css";

interface Props {}

function Curiosity({}: Props): ReactElement {
  const [images, setImages] = useState<Pics[]>([]);
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
      setImages(pics);
    }
  }, [photos, dispatch]);

  return (
    <div className="rover-container">
      <div className="site-logo">
        <Hero />
      </div>
      <div className="rover-title">
        <img src={CurText} alt="curiosity views" />
      </div>
      <ImageGrid images={images} />
    </div>
  );
}

export default Curiosity;
