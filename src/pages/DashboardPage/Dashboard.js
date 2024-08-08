import React, { useEffect, useState } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import Products from "../../components/Dashboard/Products";
import SomeData from "../../components/Dashboard/SomeData";
import "./dashboard.css";
import LineGraph from "../../components/Charts/LineGraph";
import SidebarComponent from "../../components/Dashboard/SidebarComponent";
import TopBar from "../../components/Dashboard/TopBar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      m="0"
      w="100vw"
      h="100vh"
      className="background"
      pos="absolute"
      top="0"
      left="0"
      overflow="hidden"
      display="flex"
    >
      {loading && (
        <Center h="100%" w="100%">
          <Spinner size="xl" />
        </Center>
      )}
      {!loading && (
        <>
          <SidebarComponent toggled={false} newAdress={"/add"} newData={"Add New"} className="sideBar" />
          <Box flex="1" p="4" overflow="auto" className="main">
            <TopBar newAdress={"/add"} newData={"Add New"} />
            <SomeData data={data} categories={categories} />
            <Box className="mainData">
              <Box className="lineGraph">
                <LineGraph link="https://fakestoreapi.com/products" />
              </Box>

              <Box className="products">
                <Products data={data} />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
