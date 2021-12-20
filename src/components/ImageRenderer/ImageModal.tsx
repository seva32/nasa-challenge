import React from "react";

import "./imageModal.css";

interface IImageModal {
  isOpen: boolean;
  onClick: any;
  src: string;
  children?: any;
}

const ImageModal = ({ isOpen, onClick, src, children = null }: IImageModal) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-body">
        <div className="close-modal">
          <button
            className="modal-close"
            onClick={() => onClick((prev: boolean) => !prev)}
          >
            <span>X</span>
          </button>
        </div>
        <div className="image-container-modal">
          {children}
          <img
            src={src}
            style={{
              position: "absolute",
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              border: "white solid 3px",
              padding: "10px",
              backgroundColor: "ghostwhite",
            }}
            alt="rover on mars"
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageModal;
