import React, { ReactElement, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Pics, ImageGrid, Pagination, Loading, Button } from "../../components";
import ImageModal from "../../components/ImageRenderer/ImageModal";

import { useAppSelector, useAppDispatch } from "../../store/store";
import { selectNasaData } from "../../store/reducers/nasaDataReducer";
import { NasaDataActionTypes } from "../../store/actions/nasaDataActions";

import { ReactComponent as Hero } from "../../assets/Hero.svg";
import CurText from "../../assets/cur-copy.png";
import CuriosityImg from "../../assets/curiosity.jpg";

import "./curiosity.css";

enum ModalContent {
  EARTH_DATE,
  SOL,
  CAM,
}

const CuriosityCameras = [
  "FHAZ",
  "RHAZ",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "NAVCAM",
];

interface Props {}

let PageSize = 25;

function Curiosity({}: Props): ReactElement {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [images, setImages] = useState<Pics[]>([]);
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [sol, setSol] = useState<string>("");
  const [camera, setCamera] = useState<string>("");
  const [filterApplied, setFilterApplied] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contentType, setContentType] = useState<ModalContent | null>(null);
  const { photos, error } = useAppSelector(selectNasaData);
  const dispatch = useAppDispatch();
  const prevFilter = useRef<string>("");
  const prevCam = useRef<string>("");
  const [filteredLength, setfilteredLength] = useState(0);

  useEffect(() => {
    const isRoverOk =
      photos.length && photos[0].rover?.name.toLowerCase() === "curiosity";
    if (
      !photos ||
      !photos?.length ||
      !isRoverOk ||
      prevFilter.current !== filterApplied
    ) {
      dispatch({
        type: NasaDataActionTypes.GET_NASA_DATA,
        payload: {
          rover: "curiosity",
          earth: sol ? "" : dayjs(startDate).format("YYYY-MM-DD"),
          sol: sol,
        },
      });
      prevFilter.current = filterApplied;
    }
  }, [photos, dispatch, filterApplied]);

  // useEffect(() => {
  //   if (photos.length > 0) {
  //     const firstPageIndex = (currentPage - 1) * PageSize;
  //     const lastPageIndex = firstPageIndex + PageSize;
  //     setImages(
  //       photos.slice(firstPageIndex, lastPageIndex).map((photo) => ({
  //         id: photo.id,
  //         url: photo.img_src,
  //         thumbnail: photo.img_src,
  //         aspectRatio: 1,
  //         camera: photo.camera.name,
  //       }))
  //     );
  //   }
  // }, [currentPage, photos]);

  useEffect(() => {
    if (startDate) setFilterApplied(dayjs(startDate).format("YYYY-MM-DD"));
    if (sol) setFilterApplied(sol);
  }, [startDate, sol]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (camera && prevCam.current !== camera) {
      const byCam = photos.filter((image) => image.camera.name === camera);
      setfilteredLength(byCam.length);
      setImages(
        byCam.slice(firstPageIndex, lastPageIndex).map((photo) => ({
          id: photo.id,
          url: photo.img_src,
          thumbnail: photo.img_src,
          aspectRatio: 1,
          camera: photo.camera.name,
        }))
      );
      prevCam.current = camera;
    } else {
      prevCam.current = "";
      setfilteredLength(photos.length);
      setImages(
        photos.slice(firstPageIndex, lastPageIndex).map((photo) => ({
          id: photo.id,
          url: photo.img_src,
          thumbnail: photo.img_src,
          aspectRatio: 1,
          camera: photo.camera.name,
        }))
      );
    }
  }, [camera, photos, currentPage]);

  return (
    <div className="rover-container">
      <div className="site-logo">
        <Link to="/">
          <Hero />
        </Link>
      </div>
      <div className="rover-title">
        <img src={CurText} alt="curiosity views" />
        <div className="filters">
          <div className="filter-text">Filters</div>
          <Button
            onClick={() => {
              setOpenModal(true);
              setContentType(ModalContent.EARTH_DATE);
            }}
          >
            Earth Date
          </Button>
          <Button
            onClick={() => {
              setOpenModal(true);
              setContentType(ModalContent.SOL);
            }}
          >
            Mars Date - Sol
          </Button>
          <Button
            onClick={() => {
              setOpenModal(true);
              setContentType(ModalContent.CAM);
            }}
          >
            Rover Cam
          </Button>
          <ImageModal
            isOpen={openModal}
            onClick={setOpenModal}
            src={CuriosityImg}
          >
            {contentType === ModalContent.EARTH_DATE && (
              <div className="modal-content">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => {
                    setStartDate(date);
                    setSol("");
                  }}
                />
              </div>
            )}
            {contentType === ModalContent.SOL && (
              <div className="modal-content">
                <label htmlFor="sol" className="sol-label">
                  Enter Sol:
                  <input
                    name="sol"
                    type="number"
                    step="1"
                    min="1"
                    onChange={(e) => setSol(e.target.value)}
                  />
                </label>
              </div>
            )}
            {contentType === ModalContent.CAM && (
              <div className="modal-content">
                <ul style={{ color: "white" }}>
                  Select Camera:
                  {CuriosityCameras.map((cam) => (
                    <li
                      role="button"
                      onClick={() => setCamera(cam)}
                      style={{ color: cam === camera ? "red" : "" }}
                      key={`${cam}`}
                    >
                      {cam}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ImageModal>
        </div>
        <div className="filter-text filter-applied">
          Filter applied: {filterApplied} - Camera: {camera}{" "}
          <span
            onClick={() => setCamera("")}
            style={{ display: camera ? "inline" : "none" }}
            className="remove-camera"
          >
            Remove Camera
          </span>
        </div>
      </div>
      {images.length ? (
        <>
          <ImageGrid images={images} />
          <div style={{ backgroundColor: "white" }}>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={camera ? filteredLength : photos.length}
              pageSize={PageSize}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : error || images.length === 0 ? (
        <div className="error-msg">
          Nothing to show. Please try another filter.
        </div>
      ) : (
        <Loading height="300px" />
      )}
    </div>
  );
}

export default Curiosity;
