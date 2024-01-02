import React from "react";
import { Flex } from "@chakra-ui/react";
import { Header } from "./Header";

export const Layout = ({ children, headerProps = {} }) => (
  <Flex flexDirection="column" py="4" px="8" height="100vh" position="relative">
    <Header {...headerProps} />
    <Flex as="main" flexDirection="column" mt={{ base: "164px", md: "16" }}>
      {children}
    </Flex>
  </Flex>
);
