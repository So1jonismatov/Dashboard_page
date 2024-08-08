import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title, PointElement, LineElement, LinearScale, CategoryScale } from "chart.js";

ChartJS.register(Tooltip, Legend, Title, PointElement, LineElement, LinearScale, CategoryScale);

ChartJS.defaults.borderColor = 'rgba(255,0,55,0.1)';
ChartJS.defaults.color = '#007FFF';
ChartJS.defaults.backgroundColor = 'red';

const LineGraph = ({ options = {}, link = "" }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Prices",
        data: [],
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
    ],
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(link);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const json = await res.json();
      const names = json.map((item) => item.title);
      const prices = json.map((item) => item.price);
      setData({
        labels: names,
        datasets: [
          {
            label: "Prices line graph",
            data: prices,
            fill: false,
            borderColor: "rgb(255, 0, 0)",
            tension: 0.1,
          },
          
        ],
      });
      console.log(json);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [link]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const defaultOptions = {
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
          title: function (context) {
            return context[0].label;
          },
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return <Line options={mergedOptions} data={data} />;
};

export default LineGraph;
