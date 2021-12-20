import React, { ReactElement } from "react";

import { RoverLayout } from "../../components";
import SpiText from "../../assets/spi-copy.png";

const SpiritCameras = ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"];

function Spirit(): ReactElement {
  return (
    <RoverLayout
      roverTextImg={SpiText}
      roverName="spirit"
      camerasAvailable={SpiritCameras}
    />
  );
}

export default Spirit;
