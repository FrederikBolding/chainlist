import { Button, Box, Heading, Flex } from "@chakra-ui/react";
import React from "react";
import { Search } from "./Search";

export const Header = () => (
  <Flex pb="2" justifyContent="space-between">
    <Heading>Chainlist</Heading>
    <Search />
    <Button size="lg">Connect Wallet</Button>
  </Flex>
);
