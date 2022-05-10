import { FC, useEffect, useState } from "react";

import Editer from "./Editer/Editer";
import Header from "../../UI/Header/Header";
import { IScore } from "../../../models/Score";
import { ISection } from "../../../interfaces/section";
import Tooltip from "./Tooltip/Tooltip";
import classes from "./Stats.module.scss";

interface Props {
  editMode?: boolean;
  onUpdate?: (section: keyof ISection, item: string, value: number) => void;
  stats: Omit<IScore, "game" | "user">;
}

const Stats: FC<Props> = ({ stats, editMode, onUpdate }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sections = [
    {
      type: "serves",
      label: "Zagrywka",
      items: [
        { label: "Poprawna", type: "correct", value: stats.serves.correct },
        { label: "Punktowa", type: "aces", value: stats.serves.aces },
        { label: "Błędna", type: "faults", value: stats.serves.faults },
      ],
      overall: stats.serves.overall,
    },
    {
      type: "attacks",
      label: "Atak",
      items: [
        { label: "Poprawny", type: "correct", value: stats.attacks.correct },
        { label: "Punktowy", type: "spikes", value: stats.attacks.spikes },
        { label: "Błędny", type: "faults", value: stats.attacks.faults },
      ],
      overall: stats.attacks.overall,
    },
    {
      type: "receptions",
      label: "Przyjęcie",
      items: [
        { label: "Poprawne", type: "correct", value: stats.receptions.correct },
        { label: "Niedokładne", type: "inaccurates", value: stats.receptions.inaccurates },
        { label: "Błędne", type: "faults", value: stats.receptions.faults },
      ],
      overall: stats.receptions.overall,
    },
    {
      type: "blocks",
      label: "Blok",
      items: [
        { label: "Poprawny", type: "correct", value: stats.blocks.correct },
        { label: "Punktowy", type: "points", value: stats.blocks.points },
        { label: "Autowy", type: "outs", value: stats.blocks.outs },
      ],
      overall: stats.blocks.overall,
    },
  ];

  return (
    <div className={classes.stats}>
      {sections.map((section) => (
        <div key={section.type} className={classes.section}>
          <Header>{section.label}</Header>
          <div className={classes.content}>
            {section.items.map((item) => (
              <div key={item.type}>
                {item.label}: {item.value}
                {editMode && <Editer value={item.value} onUpdate={(value: number) => onUpdate!(section.type as keyof ISection, item.type, value)} />}
              </div>
            ))}
            <div className={classes.overall} data-tip data-for={section.type}>
              Ocena: {section.overall.toFixed(2)}
            </div>
            {isMounted && <Tooltip section={section.type as keyof ISection} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
