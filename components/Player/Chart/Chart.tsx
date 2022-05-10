import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip, TooltipItem } from "chart.js";
import React, { FC } from "react";

import Header from "../../UI/Header/Header";
import { Line } from "react-chartjs-2";
import classes from "./Chart.module.scss";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  scales: {
    xAxes: {
      ticks: {
        maxRotation: 90,
        minRotation: 70,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      padding: 10,
      displayColors: false,
      callbacks: {
        label: (context: TooltipItem<"line">) => {
          return `Ocena ogólna: ${context.formattedValue}/10`;
        },
      },
    },
  },
};

interface Props {
  chart: [{ date: string; overall: number }];
}

const Chart: FC<Props> = ({ chart }) => {
  let labels: string[] = [],
    data: number[] = [];

  chart.forEach((game) => {
    labels.push(game.date);
    data.push(game.overall);
  });

  const chartData = {
    labels,
    datasets: [
      {
        data,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(255, 255, 255)",
        borderColor: "rgba(75,192,192,1)",
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 4,
        pointRadius: 1,
        pointHitRadius: 4,
      },
    ],
  };

  return (
    <div className={classes.chart}>
      <Header>Wykres formy</Header>
      <div className={classes.container}>
        <Line options={options} data={chartData} width={200} height={150} />
      </div>
    </div>
  );
};

export default Chart;
