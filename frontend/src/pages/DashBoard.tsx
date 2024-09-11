import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button, Flex, Heading } from "@chakra-ui/react";
import ChooseDisplayName from "../comps/ChooseDisplayName";
const Dashboard: React.FC = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        const displayName = localStorage.getItem("displayName");
        if (displayName) {
        setDisplayName(displayName);
        }
    }, []);

    const handleDisplayNameChange = () => {
        const displayName = localStorage.getItem("displayName");
        setDisplayName(displayName);
    };

  return (
    <Flex
      height="100vh"
      direction="column"
      alignContent="center"
      justify="center"
      bg="gray.100"
    >
      {displayName ? (
        <></>
      ) : (
        <>
          <Heading textAlign="center" fontSize="72" mb="16">
            Welcome to EpicRacerTimes
          </Heading>
          <Text fontSize="32" textAlign="center">
            Before you join a community, enter a display name:
          </Text>
          <Box maxWidth="500px" mx="auto">
            <ChooseDisplayName onChange={handleDisplayNameChange}/>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default Dashboard;
