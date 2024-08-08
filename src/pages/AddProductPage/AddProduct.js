import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import SidebarComponent from "../../components/Dashboard/SidebarComponent";
import TopBar from "../../components/Dashboard/TopBar";

const AddProduct = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price: parseFloat(price),
      description,
      category,
      image,
    };

    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        toast({
          title: "Muvaffaqiyatli bajarildi",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage("");
      } else {
        toast({
          title: `Produkt qo'sha olmadik`,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Xatolik Yuz berdi",
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

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
      <SidebarComponent toggled={false} newAdress={"/dashboard"} newData={"Dashboard"} className="sideBar" />
      <TopBar newAdress={"/dashboard"} newData={"Dashboard"} />
      <Box w={"80%"} maxW={"600px"} mx="auto" mt={10}>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl id="name" isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="category" isRequired>
            <FormLabel>Category</FormLabel>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>

          <FormControl id="image" isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Add Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddProduct;
