import React, { ReactElement } from "react";

import "./card.css";

interface Props {
  children: any;
  width: string;
}

function Card({ children, width = "100%" }: Props): ReactElement {
  return (
    <div
      className="card-frame"
      style={{ width: `${width}`, maxWidth: `${width}` }}
    >
      {children}
    </div>
  );
}

export default Card;
