import React, { ReactElement } from "react";

import { RoverLayout } from "../../components";
import OppoText from "../../assets/oppo-copy.png";

const OpportunityCameras = ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"];

function Opportunity(): ReactElement {
  return (
    <RoverLayout
      roverTextImg={OppoText}
      roverName="opportunity"
      camerasAvailable={OpportunityCameras}
    />
  );
}

export default Opportunity;
