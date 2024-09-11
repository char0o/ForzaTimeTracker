import {useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const ErrorBox: React.FC<{ message: string }> = ({ message }) => {
    return(
        <Box py="3" bg="red.400" textAlign="center">
          <Text color="white">{message}</Text>
        </Box>
      )
};

export default ErrorBox;