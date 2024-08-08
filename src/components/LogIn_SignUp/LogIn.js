import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const LogIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const users = useRef([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitHandler() {
    setLoading(true);
    if (!username || !password) {
      toast({
        title: "Iltimos nickneymingiz hamda parolingizni to'ldiring ",
        status: "warning",
        duration: "5000",
        isClosable: "true",
        position: "bottom",
      });

      setLoading(false);
      return;
    }
    try {
      const theUser = users.current.find(
        (user) => user.username === username && user.password === password
      );
      if (theUser) {
        localStorage.setItem("user", JSON.stringify(theUser));
        toast({
          title: "Xush Kelibsiz",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        navigate("/dashboard");
      } else {
        throw new Error("user topilmadi");
      }
    } catch (error) {
      toast({
        title: "Xatolik Yuz berdi",
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }

  async function userOlibKEl() {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((json) => (users.current = json))
      .catch((e) => console.log(e));
  }

  // To'g'risi documentatsiyadagi login qismini ishlatolmadim kyn vulnerable bulsayam shu usul qildim.
  useEffect(() => {
    userOlibKEl();
  }, []);

  return (
    <>
      <VStack spacing="5px" colorScheme="blackAlpha">
        <FormControl id="username" isRequired>
          <FormLabel>Nikneyningiz eg. johnd</FormLabel>
          <Input
            placeholder="eg. dagi valid "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Parolingizni kiriting eg. m38rmF$</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="eg. dagi valid password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size={"sm"} onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="red"
          width={"100%"}
          style={{ marginTop: "15px" }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Log In
        </Button>
      </VStack>
    </>
  );
};

export default LogIn;
