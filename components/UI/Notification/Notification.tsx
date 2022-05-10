import { FC, useEffect } from "react";

import classes from "./Notification.module.scss";

interface Props {
  value: { success?: string; error?: string };
  onHide: () => void;
}

const Notification: FC<Props> = ({ value, onHide }) => {
  let content;

  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (value.success) {
    content = <div className={classes.success}>{value.success}</div>;
  } else {
    content = <div className={classes.error}>{value.error}</div>;
  }
  return <div className={classes.notification}>{content}</div>;
};

export default Notification;
