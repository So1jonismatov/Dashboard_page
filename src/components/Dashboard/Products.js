import React, { useState, useEffect } from "react";
import "./Products.css";
import { Button, Box,Text } from "@chakra-ui/react";

const Products = ({ data }) => {
  const [products, setProducts] = useState(data);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <Box
    justifySelf={"end"}
      p="5px"
      border="1px solid white"
      borderRadius={"10px"}
      h="600px"
      overflowY="scroll"
      style={{
        scrollbarColor: "red transparent",
        scrollbarWidth: "thin",
      }}
    >
      {products.map((product) => (
        <Box
          key={product.id}
          id={product.id}
          display="flex"
          justifyContent="space-between"
          mb="10px"
          h="50px"
        >
          <Box
            overflow="hidden"
            display="flex"
            flexDirection="column"
            mr="10px"
          >
            <h3>{product.title}</h3>
          </Box>
          <Button w="40px" onClick={() => handleDelete(product.id)}>
            Del
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Products;
