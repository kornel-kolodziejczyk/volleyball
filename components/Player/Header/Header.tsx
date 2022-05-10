import { FC, useEffect, useState } from "react";

import Image from "next/image";
import ReactTooltip from "react-tooltip";
import classes from "./Header.module.scss";

interface Props {
  header: {
    index: number;
    name: string;
    image: string;
    games: number;
    overall: number;
    sex: string;
  };
}

const Header: FC<Props> = ({ header }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={classes.header}>
      <Image src={header.image ? `${process.env.NEXT_PUBLIC_s3_bucketUrl}/${header.image}` : `/images/site/${header.sex}.jpg`} width="80" height="80" objectFit="cover" />
      <div className={classes.info}>
        <div className={classes.name}>
          {header.index + 1}. {header.name}
        </div>
        <div>Mecze: {header.games}</div>
        <div className={classes.overall} data-tip data-for="overall">
          Ocena ogólna: {header.overall.toFixed(2)}
        </div>
        {isMounted && (
          <ReactTooltip id="overall" type="dark" effect="solid">
            <p>Maksymalna ocena to 10</p>
            <p>Jest to średnia z ocen zagrywki, ataku, przyjęcia i bloku.</p>
          </ReactTooltip>
        )}
      </div>
    </div>
  );
};

export default Header;
