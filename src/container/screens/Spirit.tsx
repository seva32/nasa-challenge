import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Pics, ImageGrid } from "../../components";

import { useAppSelector, useAppDispatch } from "../../store/store";
import { selectNasaData } from "../../store/reducers/nasaDataReducer";
import { NasaDataActionTypes } from "../../store/actions/nasaDataActions";

import { ReactComponent as Hero } from "../../assets/Hero.svg";
import SpiText from "../../assets/spi-copy.png";

import "./spirit.css";

interface Props {}

function Spirit({}: Props): ReactElement {
  const [images, setImages] = useState<Pics[]>([]);
  const { photos, isFetching, error } = useAppSelector(selectNasaData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isRoverOk = photos?.[0].rover.name.toLowerCase() === "spirit";
    if (!photos || !photos?.length || !isRoverOk) {
      dispatch({
        type: NasaDataActionTypes.GET_NASA_DATA,
        payload: { rover: "spirit" },
      });
    }

    if (photos.length && isRoverOk) {
      const pics = [];
      for (let i = 0; i < photos.length && i < 25; i++)
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
        <Link to="/">
          <Hero />
        </Link>
      </div>
      <div className="rover-title">
        <img src={SpiText} alt="Spirit views" />
      </div>
      <ImageGrid images={images} />
    </div>
  );
}

export default Spirit;
