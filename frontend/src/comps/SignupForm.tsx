import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

interface SignupData {
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
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
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        console.log("User already exists");
      } else if (response.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" mb="3" onChange={handleChange} name="email" />
        <FormLabel>Password</FormLabel>
        <Input type="password" mb="3" onChange={handleChange} name="password" />
        <Button type="submit" mb="3" colorScheme="green" width="100%">
          Sign up
        </Button>
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
        >
          Sign up with Google
        </Button>
      </FormControl>
    </form>
  );
};

export default SignupForm;
