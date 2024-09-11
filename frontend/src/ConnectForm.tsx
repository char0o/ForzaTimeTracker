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
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";

const ConnectForm: React.FC = () => {
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
            Join a community now and upload your best times
          </Text>
          <Button type="button" width="200px">
            Join now
          </Button>
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
            <Heading mb="6">Login to your account</Heading>
            <form>
              <FormControl id="email" mb="4">
                <FormLabel>Email address</FormLabel>
                <Input type="email" required />
              </FormControl>
              <FormControl id="password" mb="4">
                <FormLabel>Password</FormLabel>
                <Input type="password" required />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full" mb="4">
                Connect
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
          >Sign in with Google</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ConnectForm;
