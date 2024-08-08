import React, { useCallback, useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title, PointElement, LinearScale } from "chart.js";
import { Box } from "@chakra-ui/react";

ChartJS.register(Tooltip, Legend, Title, PointElement, LinearScale);
ChartJS.defaults.borderColor = 'rgba(255,0,55,0.1)';

const ScatterGraph = ({ options = {}, link = "" }) => {
  const [data, setData] = useState({
    datasets: [
      {
        label: "Prices",
        data: [],
        borderColor: "red",
        backgroundColor: "red",
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
      const scatterData = json.map((item, index) => ({ x: index + 1, y: item.price, label: item.title }));
      setData({
        datasets: [
          {
            label: "Prices scatter plot",
            data: scatterData,
            borderColor: "red",
            backgroundColor: "red",
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
    maintainAspectRatio: false, // Make sure chart fills its container
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
            let label = context.raw.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.raw.y);
            }
            return label;
          },
          title: function (context) {
            return "";
          },
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <Box w="100%" h="70%">
      <Scatter options={mergedOptions} data={data} />
    </Box>
  );
};

export default ScatterGraph;
