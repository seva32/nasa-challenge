import React, { useState, useRef } from "react";
import { useIntersection } from "../../hooks/useIntersection";
import ImageModal from "./ImageModal";
import "./imageRenderer.css";

interface ImageRenderer {
  url: string;
  thumb: any;
  aspectRatio: number;
  setSelectedImg: any;
  id: number;
}

const ImageRenderer = ({
  url,
  thumb,
  aspectRatio,
  setSelectedImg,
  id,
}: ImageRenderer) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const imgRef = useRef(null);
  const urlRef = useRef(url);

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className="figure-container">
      {isInView && (
        <>
          <figure className="figure">
            <img
              src={thumb}
              alt={`${aspectRatio}`}
              className={`image thumb ${!!isLoaded ? "isLoaded" : ""}`}
            />
            <img
              src={url}
              alt={`${aspectRatio}`}
              onLoad={handleOnLoad}
              className={`image ${!!isLoaded ? "isLoaded" : ""}`}
            />
            <span
              className="card-icon-open"
              onClick={() => {
                setOpenModal(true);
                setSelectedImg(id);
              }}
            >
              &#x276E; &#x276F;
            </span>
          </figure>
          <ImageModal
            isOpen={openModal}
            onClick={setOpenModal}
            src={urlRef.current}
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
