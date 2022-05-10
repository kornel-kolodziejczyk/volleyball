import { FC, ReactNode } from "react";

import classes from "./Header.module.scss";

interface Props {
  children: ReactNode;
}

const Header: FC<Props> = ({ children }) => <div className={classes.header}>{children}</div>;

export default Header;
