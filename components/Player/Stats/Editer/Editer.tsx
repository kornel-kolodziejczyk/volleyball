import { TiMinus, TiPlus } from "react-icons/ti";

import { FC } from "react";
import classes from "./Editer.module.scss";

interface Props {
  value: number;
  onUpdate: (number: number) => void;
}

const Editer: FC<Props> = ({ value, onUpdate }) => (
  <div className={classes.editer}>
    {value > 0 && <TiMinus className={classes.minus} onClick={() => onUpdate(-1)} />}
    <TiPlus className={classes.plus} onClick={() => onUpdate(1)} />
  </div>
);

export default Editer;
