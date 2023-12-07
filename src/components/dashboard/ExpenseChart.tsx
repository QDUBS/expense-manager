// components/ExpenseChart.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ claims, outliers }: any) => {
  const data = {
    labels: claims?.map(
      (claim: any) =>
        claim.profile.first_name + " " + claim.profile.last_name
    ),
    datasets: [
      {
        label: "Total",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: claims?.map((claim: any) => claim.total),
      },
      {
        label: "Outlier",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: outliers?.map((outlier: any) => outlier.total),
      },
    ],
  };
   
  return (
    <>
      <Bar data={data} />
    </>
  );
};

export default ExpenseChart;
