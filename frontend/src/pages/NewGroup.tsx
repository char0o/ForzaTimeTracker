import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Icon,
  Divider,
  Checkbox,
} from "@chakra-ui/react";
import { MdOutlinePublic, MdOutlineAdminPanelSettings } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import Navbar from "../comps/Navbar";
import { GetSession } from "../util/SessionManager";
import ErrorBox from "../comps/ErrorBox";
import { useNavigate } from "react-router-dom";

const NewGroup: React.FC = () => {
  const [groupName, setGroupName] = useState("");
  const [isPublic, setIsPublic] = useState("true");
  const [requireApproval, setRequireApproval] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setRequireApproval(e.target.checked);
  };

  const handleApprovalFlexClick = () => {
    setRequireApproval(!requireApproval);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleRadioChange = (nextValue: string) => {
    setIsPublic(nextValue);
  };

  const handleVisibilityClick = (value: string) => {
    setIsPublic(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const session = GetSession();
    if (!session || !session.token) {
        return;
    }
    try {
        const response = await fetch("http://localhost:5000/api/newgroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.token}`,
            },
            body: JSON.stringify({
                groupName,
                isPublic,
                requireApproval,
            }),
        });
        if (response.status === 400) {
            setError("Group name is already taken");
        } else if (response.status === 201) {
            navigate("/mygroups");
            return;
        }
    } catch (error) {
    }
    console.log("Form submitted");
  };
  return (
    <Flex
      height="100vh"
      direction="column"
      alignContent="center"
      justifyContent="flex-start"
      justify="center"
      bg="gray.50"
    >
      <Navbar />
      <Box mx="auto">
        <Heading my="5">Create a new group</Heading>
        {error && <ErrorBox message={error} />}
        <form onSubmit={handleSubmit}>
          <FormControl id="groupname" mb="4">
            <FormLabel fontWeight="bold">Group Name</FormLabel>
            <Input
              type="text"
              onChange={handleTextChange}
              name="groupname"
              bg="white"
              mb="5"
              required
            />
            <Divider borderColor="gray.250" />
            <RadioGroup
              onChange={handleRadioChange}
              name="isPublic"
              value={isPublic}
              my="5"
            >
              <Stack direction="column">
                <Flex
                  alignItems="center"
                  onClick={() => handleVisibilityClick("true")}
                >
                  <Radio size="lg" value="true" mr="2" />
                  <Icon as={MdOutlinePublic} h="9" w="9" mr="1" />
                  <Flex direction="column">
                    <Text fontWeight="bold">Public</Text>
                    <Text fontSize="sm">Anyone can join your group</Text>
                  </Flex>
                </Flex>

                <Flex
                  alignItems="center"
                  onClick={() => handleVisibilityClick("false")}
                >
                  <Radio size="lg" value="false" mr="2" />
                  <Icon as={CiLock} h="9" w="9" mr="1" />
                  <Flex direction="column">
                    <Text fontWeight="bold">Private</Text>
                    <Text fontSize="sm">
                      Only invited users can join your group
                    </Text>
                  </Flex>
                </Flex>
              </Stack>
            </RadioGroup>
            <Divider borderColor="gray.250" />
            <Flex alignItems="center" my="5" >
              <Checkbox
                size="lg"
                value="false"
                mr="2"
                isChecked={requireApproval}
                onChange={handleCheckboxChange}
              />
              <Flex onClick={handleApprovalFlexClick} alignItems="center">
                <Icon as={MdOutlineAdminPanelSettings} h="9" w="9" mr="1" />
                <Flex direction="column">
                  <Text fontWeight="bold">Times require approval</Text>
                  <Text fontSize="sm">
                    Submitted times will require moderator approval
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </FormControl>
          <Flex mx="auto" justifyContent="center">
            <Button type="submit" colorScheme="blue">
              Create Group
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default NewGroup;
