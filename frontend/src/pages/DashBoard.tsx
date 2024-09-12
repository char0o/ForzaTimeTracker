import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button, Flex, Heading } from "@chakra-ui/react";
import ChooseDisplayName from "../comps/ChooseDisplayName";
const Dashboard: React.FC = () => {
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const displayName = localStorage.getItem("displayName");
    if (displayName) {
      setDisplayName(displayName ?? undefined);
      
    } else {
        setDisplayName(undefined);
    }
    setLoading(false);
  }, []);

  const handleDisplayNameChange = () => {
    const displayName = localStorage.getItem("displayName");
    if (displayName){
        setDisplayName(displayName ?? undefined);
    } else {
        setDisplayName(undefined);
    }
    
  };
  if (loading) {
    return null;
  }
  console.log(displayName);
  return (
    <Flex
      height="100vh"
      direction="column"
      alignContent="center"
      justify="center"
      bg="gray.100"
    >
      {displayName === 'undefined' ? (
        <>
          {" "}
          <Heading textAlign="center" fontSize="72" mb="16">
            Welcome to EpicRacerTimes
          </Heading>
          <Text fontSize="32" textAlign="center">
            Before you join a community, enter a display name:
          </Text>
          <Box maxWidth="500px" mx="auto">
            <ChooseDisplayName onChange={handleDisplayNameChange} />
          </Box>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Dashboard;
