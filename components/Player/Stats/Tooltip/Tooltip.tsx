import { FC } from "react";
import ReactTooltip from "react-tooltip";
import classes from "./Tooltip.module.scss";

const data = {
  serves: {
    labels: ["zagrywki", "zagrywek"],
    formula: `Oz = \u03B3(Zp + 2 * Zpk) * \u03B4`,
    descriptions: [
      "Oz - ocena zagrywki",
      "G - ilość graczy",
      "Z - wszystkie zagrywki",
      "Zz - zagrywki zawodnika",
      "Zp - zagrywka poprawna",
      "Zpk - zagrywka punktowa",
      "\u03B3 - współczynnik oceny",
      "\u03B4 - współczynnik zaangażowania",
    ],
  },
  attacks: {
    labels: ["ataku", "ataków"],
    formula: `Oa = \u03B3(Ap + 2 * Apk) * \u03B4`,
    descriptions: [
      "Oa - ocena ataku",
      "G - ilość graczy",
      "A - wszystkie ataki",
      "Az - ataki zawodnika",
      "Ap - atak poprawny",
      "Apk - atak punktowy",
      "\u03B3 - współczynnik oceny",
      "\u03B4 - współczynnik zaangażowania",
    ],
  },
  receptions: {
    labels: ["przyjęcia", "przyjęć"],
    formula: `Op = \u03B3(Pn + 2 * Pp) * \u03B4`,
    descriptions: [
      "Op - ocena przyjęcia",
      "G - ilość graczy",
      "P - wszystkie przyjęcia",
      "Pz - przyjęcia zawodnika",
      "Pp - przyjęcie poprawne",
      "Pn - przyjęcie niedokładne",
      "\u03B3 - współczynnik oceny",
      "\u03B4 - współczynnik zaangażowania",
    ],
  },
  blocks: {
    labels: ["bloku", "bloków"],
    formula: `Ob = \u03B3(Bp + 2 * Bpk) * \u03B4`,
    descriptions: [
      "Ob - ocena bloku",
      "G - ilość graczy",
      "B - wszystkie bloki",
      "Bz - bloki zawodnika",
      "Bp - blok poprawny",
      "Bpk - blok punktowy",
      "\u03B3 - współczynnik oceny",
      "\u03B4 - współczynnik zaangażowania",
    ],
  },
};

interface Props {
  section: keyof typeof data;
}

const Tooltip: FC<Props> = ({ section }) => (
  <ReactTooltip id={section} data-type="dark">
    <div className={classes.tooltip}>
      <p>Maksymalna ocena {data[section].labels[0]} to 10.</p>
      <p>Obliczana jest ze wzoru:</p>
      <code className={classes.formula}>{data[section].formula}</code>
      <p>Gdzie:</p>
      <ul>
        {data[section].descriptions.map((description, index) => (
          <li key={index}>
            <code>{description}</code>
          </li>
        ))}
      </ul>
    </div>
  </ReactTooltip>
);

export default Tooltip;
