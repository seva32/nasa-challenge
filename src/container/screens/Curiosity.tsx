import React, { ReactElement } from "react";

import { RoverLayout } from "../../components";
import CurText from "../../assets/cur-copy.png";

const CuriosityCameras = [
  "FHAZ",
  "RHAZ",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "NAVCAM",
];

function Curiosity(): ReactElement {
  return (
    <RoverLayout
      roverTextImg={CurText}
      roverName="curiosity"
      camerasAvailable={CuriosityCameras}
    />
  );
}

export default Curiosity;
