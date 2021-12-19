import React, { ReactElement, useState, useEffect } from "react";

import ImageRenderer from "./ImageRenderer";

import "./imageGrid.css";

export type Pics = {
  id: number;
  url: string;
  thumbnail: string;
  aspectRatio: number;
};

interface Props {
  images: Pics[];
}

function ImageGrid({ images }: Props): ReactElement {
  const [showPics, setShowPics] = useState<Pics[]>(images);
  const [selectedImg, setSelectedImg] = useState<number>(0);

  useEffect(() => {
    if (images.length) {
      setShowPics(images);
    }
  }, [images]);

  return (
    <div className="image-container">
      {showPics.length &&
        showPics.map((data, idx) => (
          <div
            style={{
              zIndex: `${selectedImg === data.id ? 1 : 0}`,
              position: "relative",
            }}
            className={
              idx === showPics.length - 1 && showPics.length % 2 !== 0
                ? "last-item"
                : ""
            }
            key={`${data.id}`}
          >
            <ImageRenderer
              url={data.url}
              thumb={data.thumbnail}
              aspectRatio={data.aspectRatio}
              setSelectedImg={setSelectedImg}
              id={data.id}
            />
          </div>
        ))}
    </div>
  );
}

export default ImageGrid;
