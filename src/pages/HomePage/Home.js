import { Text, Box, Container } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import LogIn from "../../components/LogIn_SignUp/LogIn";
import SignUp from "../../components/LogIn_SignUp/SignUp";

const Home = () => {
  return (
    <Box m={"0"} w={"100vw"} h={"100vh"} className="background" bg={"rgb(255,255,255,0.2)"} pos={"absolute"} top={"0"} left={"0"}>
      <Box maxW={"xl"} style={{margin:"0 auto"}}>
        <Box d="flex" justifyContent='center' textAlign="center" p={3} bg="teal" color="aliceblue" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="0px">
          <Text fontSize="2xl" fontFamily="Work Sans">
            Please Register or LogIn
          </Text>
        </Box>
        <Box p="4" bg="rgba(255,255,255,0)" w="100%" borderWidth="1px" borderRadius="lg">
        <Tabs isFitted variant="enclosed" colorScheme="blue">
            <TabList mb="1em">
              <Tab color="rgb(100,100,150)" bg={"rgba(0,0,0,0.2)"} _selected={{ color: 'white', bg: 'blue.400' }} fontSize={"l"} borderRadius={"lg"}>Log In</Tab>
              <Tab color="rgb(100,100,150)" bg={"rgba(0,0,0,0.2)"} _selected={{ color: 'white', bg: 'red.500' }} fontSize={"l"} borderRadius={"lg"}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LogIn/>
              </TabPanel>
              <TabPanel>
                <SignUp/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
