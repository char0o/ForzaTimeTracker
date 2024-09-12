import React, { useEffect, useState } from "react";
import { Box, Text, Button, Flex, Heading, Link, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const GroupsDisplay: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

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
          setGroups(data);
        }
      } catch (error) {
        console.log("ok");
        console.error(error);
      }
    };
    fetchGroups();
  }, []);
  return (
    <Flex>
      <Box mx="auto">
        {groups.length === 0 ? (
          <Box>
            <Text fontSize="24" my="5">
              No Groups found
            </Text>
            <Button width="100%" colorScheme="green" onClick={() => handleClick("create")}>
              Create a group
            </Button>
            <Flex align="center" my="4">
            <Divider borderColor="gray.300" />
            <Text mx="2" color="gray.500">
              or
            </Text>
            <Divider borderColor="gray.300" />
          </Flex>
          <Button width="100%" colorScheme="blue" onClick={() => handleClick("join")}>
              Join a group
            </Button>
          </Box>
        ) : (
          <Text>Groups</Text>
        )}
      </Box>
    </Flex>
  );
};

export default GroupsDisplay;
