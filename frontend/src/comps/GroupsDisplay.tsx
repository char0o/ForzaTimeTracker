import React, { useEffect, useState } from "react";
import { Box, Text, Button, Flex, Heading } from "@chakra-ui/react";

const GroupsDisplay: React.FC = () => {

    const [groups, setGroups] = useState([]);

  useEffect(() => {

    const fetchGroups = async () => {
        try {
            const sessionObj = JSON.parse(localStorage.getItem("sessionInfo") || "{}");
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
    
    <Box>
        {groups.length === 0 ? <Text>No Group found</Text> : <Text>Groups</Text>}
      <Text> Groups Display Page </Text>
    </Box>
  );
};

export default GroupsDisplay;
