import React, { FC, MouseEventHandler } from "react";

import ReactDOM from "react-dom";
import classes from "./Overlay.module.scss";

interface Props {
  setDrawer: MouseEventHandler;
}

const Overlay: FC<Props> = ({ setDrawer }) =>
  typeof window !== "undefined" ? ReactDOM.createPortal(<div className={classes.overlay} onClick={setDrawer}></div>, document.getElementById("overlay") as HTMLElement) : null;

export default Overlay;
