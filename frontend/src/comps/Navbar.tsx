import { Box, Flex, Link, Grid, GridItem, Text, Icon } from "@chakra-ui/react";
import { TiGroup } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "./LogoutButton";
const Navbar: React.FC = () => {
  return (
    <Box
      py="3"
      width="100%"
      bgGradient="linear(to-b, blue.300, blue.500)"
    >
      <Grid templateColumns="repeat(24, 1fr)" alignItems="center">
        <GridItem colSpan={1}>
          <Link href="/dashboard" fontSize="24" color="white" mx="5" fontWeight="bold">
            Dashboard
          </Link>
        </GridItem>
        <GridItem colSpan={1} colStart={2}>
        <Flex align="center" mx="3">
            <Icon as={CgProfile} mt="1" w="6" h="6" color="white"></Icon>
            <Link fontSize="20" color="white" mx="2">
              Profile
            </Link>
          </Flex>
        </GridItem>
        <GridItem colSpan={3} colStart={3}>
          <Flex align="center">
            <Icon as={TiGroup} mt="1" w="6" h="6" color="white"></Icon>
            <Link href="/mygroups" fontSize="20" color="white" mx="2">
              My groups
            </Link>
          </Flex>
        </GridItem>
        <GridItem colStart={24} colEnd={24}>
          <LogoutButton />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Navbar;
