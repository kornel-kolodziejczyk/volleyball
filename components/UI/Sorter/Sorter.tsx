import { FC, ReactNode } from "react";

import classes from "./Sorter.module.scss";

interface Props {
  children: ReactNode;
}

const Sorter: FC<Props> = ({ children }) => <div className={classes.sorter}>{children}</div>;

export default Sorter;
