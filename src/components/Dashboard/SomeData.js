import { Box, HStack, VStack, Heading, Text, Card } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DoughnutChart from "../Charts/DoughnutChart";
import ScatterGraph from "../Charts/ScatterGraph";
import "./SomeData.css";

const SomeData = ({ data, categories }) => {
  const [categoryCount, setCategoryCount] = useState([]);

  useEffect(() => {
    if (categories && data) {
      const categCount = new Array(categories.length).fill(0);
      data.forEach((element) => {
        const categoryIndex = categories.indexOf(element.category);
        if (categoryIndex !== -1) {
          categCount[categoryIndex]++;
        }
      });
      setCategoryCount(categCount);
    }
  }, [data, categories]);

  return (
    <Box className="parent">
      <Box className="charts-parent">
        <Box className="charts">
          <DoughnutChart datas={categoryCount} labels={categories} />
        </Box>
        <Box className="charts">
          <ScatterGraph link="https://fakestoreapi.com/products" />
        </Box>
      </Box>
      <Box className="cards">
        {categories.map((category, ix) => (
          <Card className="card" key={category}>
            <VStack>
              <Text fontSize={"xl"}>{category}</Text>
              <Heading color={"red"}>{categoryCount[ix]}</Heading>
            </VStack>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SomeData;
