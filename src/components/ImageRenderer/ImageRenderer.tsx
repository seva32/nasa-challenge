import React, { useState, useRef } from "react";
import { useIntersection } from "../../hooks/useIntersection";
import "./imageRenderer.css";

interface ImageRenderer {
  url: string;
  thumb: any;
  aspectRatio: number;
}

const ImageRenderer = ({ url, thumb, aspectRatio }: ImageRenderer) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `${aspectRatio * 100}%`,
      }}
    >
      {isInView && (
        <>
          <img
            className={`image thumb ${!!isLoaded ? "isLoaded" : ""}`}
            src={thumb}
          />
          <img
            className={`image ${!!isLoaded ? "isLoaded" : ""}`}
            src={url}
            onLoad={handleOnLoad}
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
