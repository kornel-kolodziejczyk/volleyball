import { ArcElement, Chart as ChartJS, Legend, Tooltip, TooltipItem } from "chart.js";
import React, { FC } from "react";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Context } from "vm";
import Header from "../../UI/Header/Header";
import { Pie } from "react-chartjs-2";
import classes from "./PieChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  labels: string[];
  overall: number;
  section: string;
  values: number[];
}

const backgroundColor = ["rgb(251, 131, 50, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"];
const borderColor = ["rgb(251, 131, 50, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"];

const PieChart: FC<Props> = ({ section, labels, values, overall }) => {
  const options = {
    responsive: true,
    layout: { padding: 10 },
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "black",
        font: { weight: 600 },
        formatter: (value: number, ctx: Context) => {
          if (value > 0) {
            return `${((value / ctx.dataset.data.reduce((sum: number, element: number) => sum + element, 0)) * 100).toFixed()}%`;
          }
          return "";
        },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={classes.pieChart}>
      <Header>{section}</Header>
      <div className={classes.content}>
        <div className={classes.overall}>ŚREDNIA OCENA: {overall.toFixed(2)}/10</div>
        <div className={classes.legends}>
          {labels.map((label, index) => (
            <div key={label} className={classes.legend}>
              <div style={{ backgroundColor: backgroundColor[index], borderColor: borderColor[index] }} className={classes.square}></div>
              <div>{label}</div>
            </div>
          ))}
        </div>
        <Pie data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default PieChart;
