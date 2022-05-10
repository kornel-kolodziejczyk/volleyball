import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import classes from "./Toggler.module.scss";

interface Props {
  setDrawer: () => void;
}

const Toggler: FC<Props> = ({ setDrawer }) => (
  <button className={classes.toggler} onClick={setDrawer}>
    <GiHamburgerMenu />
  </button>
);

export default Toggler;
