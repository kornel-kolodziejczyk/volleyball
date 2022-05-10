import { FC, ReactNode } from "react";

import classes from "./Button.module.scss";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, disabled, onClick }) => (
  <button className={classes.button} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);

export default Button;
