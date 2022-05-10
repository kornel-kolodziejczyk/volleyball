import Chart from "./Chart/Chart";
import { FC } from "react";
import Header from "./Header/Header";
import { IPlayer } from "../../interfaces/player";
import { ISection } from "../../interfaces/section";
import Stats from "./Stats/Stats";
import classes from "./Player.module.scss";

interface Props {
  editMode?: boolean;
  onUpdate?: (id: string, section: keyof ISection, item: string, value: number) => void;
  player: IPlayer & { index: number };
}

const Player: FC<Props> = ({ player, editMode, onUpdate }) => {
  const statsProps = {
    stats: { overall: player.overall, serves: player.serves, attacks: player.attacks, receptions: player.receptions, blocks: player.blocks },
    ...(editMode && { editMode }),
    ...(onUpdate && { onUpdate: (section: keyof ISection, item: string, value: number) => onUpdate(player._id, section, item, value) }),
  };

  return (
    <div className={classes.player}>
      <Header header={{ name: player.name, games: player.games, image: player.image, overall: player.overall, sex: player.sex, index: player.index }} />
      <Stats {...statsProps} />
      {player.chart && <Chart chart={player.chart} />}
    </div>
  );
};

export default Player;
