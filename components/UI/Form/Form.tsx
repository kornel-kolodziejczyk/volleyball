import { FC, FormEventHandler, ReactNode } from "react";

import classes from "./Form.module.scss";

interface Props {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const Form: FC<Props> = ({ children, onSubmit }) => (
  <form className={classes.form} onSubmit={onSubmit}>
    {children}
  </form>
);

export default Form;
