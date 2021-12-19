import React from "react";

import "./imageModal.css";

interface ImageModal {
  isOpen: boolean;
  onClick: any;
  src: string;
}

const ImageModal = ({ isOpen, onClick, src }: ImageModal) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-body">
        <div className="close-modal">
          <a
            className="modal-close"
            href="#"
            onClick={() => onClick((prev: boolean) => !prev)}
          >
            <span>X</span>
          </a>
        </div>
        <div className="image-container-modal">
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
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ImageModal;
