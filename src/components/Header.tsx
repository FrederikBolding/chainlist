import { Button, Box, Heading, Flex } from "@chakra-ui/react";
import React from "react";
import { Search } from "./Search";

export const Header = (props) => (
  <Flex pb="2" justifyContent="space-between">
    <Heading>Chainlist</Heading>
    <Search {...props} />
    <Button size="lg">Connect Wallet</Button>
  </Flex>
);
