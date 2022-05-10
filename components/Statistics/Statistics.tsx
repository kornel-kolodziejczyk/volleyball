import { FC, useState } from "react";

import { IScore } from "../../models/Score";
import PieChart from "./PieChart/PieChart";
import Sorter from "../UI/Sorter/Sorter";
import classes from "./Statistics.module.scss";

interface Props {
  statistics: {
    all: Pick<IScore, "serves" | "attacks" | "receptions" | "blocks"> & { games: number };
    female: Pick<IScore, "serves" | "attacks" | "receptions" | "blocks"> & { games: number };
    male: Pick<IScore, "serves" | "attacks" | "receptions" | "blocks"> & { games: number };
  };
}

const Statistics: FC<Props> = (props) => {
  const [statistics, setStatistics] = useState(props.statistics.all);

  return (
    <div className={classes.statistics}>
      <Sorter>
        <select onChange={(e) => setStatistics(props.statistics[e.target.value as keyof typeof props.statistics])}>
          <option value="all">Wszyscy</option>
          <option value="male">Mężczyźni</option>
          <option value="female">Kobiety</option>
        </select>
      </Sorter>
      <div className={classes.charts}>
        <PieChart section="ZAGRYWKA" labels={["Poprawna", "Punktowa", "Błędna"]} values={Object.values(statistics.serves).slice(0, 3)} overall={statistics.serves.overall / statistics.games} />
        <PieChart section="ATAK" labels={["Poprawny", "Punktowy", "Błędny"]} values={Object.values(statistics.attacks).slice(0, 3)} overall={statistics.attacks.overall / statistics.games} />
        <PieChart
          section="PRZYJĘCIE"
          labels={["Poprawne", "Niedokładne", "Błędne"]}
          values={Object.values(statistics.receptions).slice(0, 3)}
          overall={statistics.receptions.overall / statistics.games}
        />
        <PieChart section="BLOK" labels={["Poprawny", "Punktowy", "Autowy"]} values={Object.values(statistics.blocks).slice(0, 3)} overall={statistics.blocks.overall / statistics.games} />
      </div>
    </div>
  );
};

export default Statistics;
