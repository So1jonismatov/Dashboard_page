import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function submitHandler() {
    setLoading(true);
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !username ||
      !surname
    ) {
      toast({
        title: `Iltimos hamma so'rovlarni to'ldiring`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } else if (password.localeCompare(confirmPassword) !== 0) {
      toast({
        title: "Parol har-xil",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } else {
      try {
        const ourUser = JSON.stringify({
          email: email,
          username: name,
          password: password,
          name: {
            firstname: name,
            lastname: surname,
          },
          address: {
            city: "kilcoole",
            street: "7835 new road",
            number: 3,
            zipcode: "12926-3874",
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: "1-570-236-7033",
        });
        fetch("https://fakestoreapi.com/users", {
          method: "POST",
          body: ourUser,
        })
          .then((res) => res.json())
          .then((json) => localStorage.setItem("user", ourUser));

        toast({
          title: "Xush Kelibsiz",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/dashboard");
      } catch (error) {
        toast({
          title: "XatolikYuz berdi",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  }

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="name" isRequired>
          <FormLabel>Ismingizni Kiriting: </FormLabel>
          <Input
            type="text"
            placeholder="ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="surname" isRequired>
          <FormLabel>Familiyangizni Kiriting: </FormLabel>
          <Input
            type="text"
            placeholder="Familiyangiz"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </FormControl>
        <FormControl id="username" isRequired>
          <FormLabel>Username Kiriting: </FormLabel>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>E-mailingizni Kiriting: </FormLabel>
          <Input
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Parol o'ylab toping: </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Parolni qaytib kiriting: </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Parol"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width={"4.5rem"}>
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width={"100%"}
          style={{ marginTop: "15px" }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default SignUp;
