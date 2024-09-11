import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import SignupModal from "./SignupModal";

interface ConnectData {
  email: string;
  password: string;
}

const ConnectForm: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<ConnectData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        setLoading(false);
        setError("Invalid credentials");
        throw new Error("Response not ok");
      }
    } catch (error) {
      setLoading(false);
      setError("Error while connecting to the server");
      console.error(error);
    }
  };

  return (
    <Flex height="100vh">
      <Box
        flex="1"
        display="flex"
        bg="blue.900"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          direction="column"
          height="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Box flex="1" display="flex" bg="blue.950">
            <Text color="white" mb="4" fontSize="48px" textAlign="center">
              Keep track of your best times on the race track.
            </Text>
          </Box>
          <Text color="white" fontSize="24px" mb="4">
            Join or create a community and upload your best times
          </Text>
          <Button onClick={onOpen} type="button" width="200px">
            Join now
          </Button>
          <SignupModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Box>

      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <Flex direction="column">
          <Box>
            <Heading mb="3">Login to your account</Heading>
            {error && <Box py="3" bg="red.400" textAlign="center"><Text color="white">{error}</Text></Box>}
            <form onSubmit={handleSubmit}>
              <FormControl id="email" mb="4">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleChange} required />
              </FormControl>
              <FormControl id="password" mb="4">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={handleChange} required />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full" mb="4" isLoading={loading} loadingText="Connecting...">
                {loading ? "Connecting..." : "Sign in"}
              </Button>
            </form>
          </Box>
          <Flex align="center" mb="4">
            <Divider borderColor="gray.300" />
            <Text mx="2" color="gray.500">
              or
            </Text>
            <Divider borderColor="gray.300" />
          </Flex>

          <Button
            leftIcon={<FcGoogle />}
            colorScheme="gray"
            variant="outline"
            mb="4"
          >
            Sign in with Google
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ConnectForm;
