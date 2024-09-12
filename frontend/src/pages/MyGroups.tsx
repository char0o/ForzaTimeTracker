import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import Navbar from '../comps/Navbar';
import GroupsDisplay from '../comps/GroupsDisplay';
const MyGroups: React.FC = () => {
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
        <GroupsDisplay />
        </Flex>
    );
}

export default MyGroups;