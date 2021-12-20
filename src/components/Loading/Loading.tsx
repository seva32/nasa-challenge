import React, { ReactElement } from "react";

import "./loading.css";

interface Props {
  width?: string;
  height?: string;
}

function Loading({ width = "100%", height = "100%" }: Props): ReactElement {
  return <span className="skeleton-box" style={{ width, height }}></span>;
}

export default Loading;
