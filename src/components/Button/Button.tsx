import React, { ReactElement } from "react";

import "./button.css";

interface Props {
  children: any;
  onClick: any;
}

function Button({ children, onClick }: Props): ReactElement {
  return (
    <button onClick={onClick} className="button-component">
      {children}
    </button>
  );
}

export default Button;
