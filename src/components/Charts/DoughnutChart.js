import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import { position } from "@chakra-ui/react";

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labels = [], datas = [] }) => {
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: datas,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(54,255,162)"
        ],
        hoverOffset: 20,
      },
    ],
  });

  const options = {
    plugins: {
      legend: {
        display: true,
        position:'right'
      },
      tooltip: {
        enabled: true, 
      }
    }
  };

  useEffect(() => {
    setData({
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: datas,
          backgroundColor: [
            "rgb(255, 0, 0)",
            "rgb(90, 06, 223)",
            "rgb(150, 250, 180)",
            "rgb(50,225,16)"
          ],
          hoverOffset: 20,
          spacing:2,
          borderWidth:0

        },
      ],
    });
  }, [labels, datas]);

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
