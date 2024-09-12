import {useEffect, useState } from "react";
import { Box, Text, keyframes } from "@chakra-ui/react";

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

const ErrorBox: React.FC<{ message: string }> = ({ message }) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);
    const timeout = setTimeout(() => {
      setFlash(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }
  , [message]);
    return(
        <Box py="3" bg="red.400" textAlign="center" animation={flash ? `${shakeAnimation} 0.5s ease-in-out` : undefined}>
          <Text color="white">{message}</Text>
        </Box>
      )
};

export default ErrorBox;