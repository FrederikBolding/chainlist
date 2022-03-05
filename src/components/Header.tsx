import { Button, Heading, Flex, Text, Avatar, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { Search } from "./Search";

export const Header = (props) => {
  const { handleConnect, isConnected, address } = useContext(Web3Context);
  return (
    <Flex
      pb="2"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Heading>Chainlist</Heading>
      <Search {...props} />
      <Box>
        {!isConnected ? (
          <Button
            w={{ base: "100%", md: "auto" }}
            size="lg"
            onClick={handleConnect}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button size="lg" w={{ base: "100%", md: "auto" }}>
            <Text fontSize="sm" isTruncated>
              {address}
            </Text>
          </Button>
        )}
      </Box>
    </Flex>
  );
};
