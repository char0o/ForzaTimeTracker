import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";
import ConnectForm from "../comps/ConnectForm";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return <ConnectForm />;
};

export default HomePage;
