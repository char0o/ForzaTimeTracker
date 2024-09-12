import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Heading,
  Link,
  Divider,
  Card,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { group } from "console";

const GroupsDisplay: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClick = (name: string) => {
    switch (name) {
      case "create":
        navigate("/newgroup");
        break;
      case "join":
        navigate("/joingroup");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const sessionObj = JSON.parse(
          localStorage.getItem("sessionInfo") || "{}"
        );
        if (!sessionObj || !sessionObj.token) {
          console.error("No session info found");
          return;
        }
        const res = await fetch("http://localhost:5000/api/groups", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionObj.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setGroups(data);

          setLoading(false);
        }
      } catch (error) {
        console.log("ok");
        console.error(error);
      }
    };
    fetchGroups();
  }, []);

  if (loading) {
    return null;
  }

  const groupItems = groups.map((group: any) => (
    <Card key={group._id} my="4" width="500px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" my="2" mx="2">
          <Image
            mx="2"
            borderRadius="full"
            src="/lesboys.png"
            boxSize="64px"
          ></Image>
          <Flex direction="column">
            <Link
              mx="4"
              color="blue.700"
              fontSize="24"
              href={`/group/${group._id}`}
            >
              {group.name}
            </Link>
            <Flex alignItems="center" mx="4" my="2">
              <Icon as={MdGroups} h="8" w="8"></Icon>
              <Text fontSize="20" mx="2">
                {group.numMembers} member
              </Text>
            </Flex>
          </Flex>
          
        </Flex>
        <Button mx="5" colorScheme="red">Leave</Button>
      </Flex>
    </Card>
  ));
  return (
    <Flex>
      <Box mx="auto">
        <Box>
          <Heading my="4">Your groups</Heading>

          {groupItems}
          <Divider></Divider>
          <Flex justifyContent="space-around" my="4">
            <Button
              mx="4"
              colorScheme="green"
              onClick={() => handleClick("create")}
            >
              Create a group
            </Button>
            <Button
              mx="5"
              colorScheme="blue"
              onClick={() => handleClick("join")}
            >
              Join a group
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default GroupsDisplay;
