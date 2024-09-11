import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";

const SignupForm: React.FC = () => {
  return (
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" mb="3"/>
        <FormLabel>Password</FormLabel>
        <Input type="password" mb="3"/>
        <Button type="submit" mb="3" colorScheme="green" width="100%">Sign up</Button>
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
            width="100%"
          >Sign up with Google</Button>
      </FormControl>
  );
};

export default SignupForm;
