import { FC } from "react";
import { FaVolleyballBall } from "react-icons/fa";
import Link from "next/link";
import classes from "./Logo.module.scss";

const Logo: FC = () => (
  <div className={classes.logo}>
    <FaVolleyballBall />
    <Link href="/">SIATKÓWKA</Link>
  </div>
);

export default Logo;
