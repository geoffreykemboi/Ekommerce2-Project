import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register all necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function SalesChart({ salesData }) {
  // Chart options for a multi-axis line chart
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Sales & Order Data",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false, // Don't draw grid lines for the second y-axis
        },
      },
    },
  };

  // Extract labels (dates) and data points from the salesData prop
  // Optional chaining (?.) is used as a safeguard in case the prop is not yet available.
  const labels = salesData?.map((item) => item.date);
  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: salesData?.map((item) => item.sales),
        borderColor: "rgb(8, 104, 32)",
        backgroundColor: "rgba(14, 241, 14, 0.5)",
        yAxisID: "y", // Assign this dataset to the 'y' axis (left)
      },
      {
        label: "Orders",
        data: salesData?.map((item) => item.numOrders),
        borderColor: "rgb(245, 9, 33)",
        backgroundColor: "rgba(245, 9, 33, 0.5)",
        yAxisID: "y1", // Assign this dataset to the 'y1' axis (right)
      },
    ],
  };

  return <Line options={options} data={data} />;
}
