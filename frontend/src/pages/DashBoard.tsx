import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box>
      <Text>Dashboard</Text>
      <Button onClick={handleClick}>Click</Button>
    </Box>
  );
};

export default Dashboard;
