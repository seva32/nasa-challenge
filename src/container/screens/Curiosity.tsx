import React, { ReactElement, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { Pics, ImageGrid, Pagination, Loading } from "../../components";

import { useAppSelector, useAppDispatch } from "../../store/store";
import { selectNasaData } from "../../store/reducers/nasaDataReducer";
import { NasaDataActionTypes } from "../../store/actions/nasaDataActions";

import { ReactComponent as Hero } from "../../assets/Hero.svg";
import CurText from "../../assets/cur-copy.png";

import "./curiosity.css";

interface Props {}

let PageSize = 25;

function Curiosity({}: Props): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState<Pics[]>([]);
  const [open, setOpen] = useState(false);
  const { photos, isFetching, error } = useAppSelector(selectNasaData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isRoverOk =
      photos.length && photos[0].rover?.name.toLowerCase() === "curiosity";
    if (!photos || !photos?.length || !isRoverOk) {
      dispatch({
        type: NasaDataActionTypes.GET_NASA_DATA,
        payload: {
          rover: "curiosity",
          // earth: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
          sol: "1000",
          // earth: "2020-09-22",
        },
      });
    }
  }, [photos, dispatch]);

  useEffect(() => {
    if (photos.length > 0) {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      setImages(
        photos.slice(firstPageIndex, lastPageIndex).map((photo) => ({
          id: photo.id,
          url: photo.img_src,
          thumbnail: photo.img_src,
          aspectRatio: 1,
        }))
      );
    }
  }, [currentPage, photos]);

  return (
    <div className="rover-container">
      <div className="site-logo">
        <Link to="/">
          <Hero />
        </Link>
      </div>
      {images.length ? (
        <>
          <div className="rover-title">
            <img src={CurText} alt="curiosity views" />
          </div>

          <ImageGrid images={images} />
          <div style={{ backgroundColor: "white" }}>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={photos.length}
              pageSize={PageSize}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : error ? (
        <div style={{ color: "white", alignSelf: "center" }}>
          Error loading Data. Please try again.
        </div>
      ) : (
        <Loading height="300px" />
      )}
    </div>
  );
}

export default Curiosity;
