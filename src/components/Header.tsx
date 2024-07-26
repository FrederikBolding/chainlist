import {
  Button,
  Heading,
  Flex,
  Text,
  IconButton,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { DarkModeToggle } from "./DarkModeToggle";
import { Search } from "./Search";
import { FaGithub } from "react-icons/fa";
import { AddIcon } from "@chakra-ui/icons";
import { Filters } from "./Filters";
import { Link as GatsbyLink } from "gatsby";

export const Header = ({ showSearch = true, showFilters = true }) => {
  const { handleConnect, isConnected, address } = useContext(Web3Context);
  return (
    <Flex
      as="header"
      flexShrink="0"
      py="3"
      px="8"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
      backdropFilter="auto"
      backdropBlur="1.25rem"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="sticky"
    >
      <GatsbyLink to="/">
        <Heading as="h1">Chainlist</Heading>
      </GatsbyLink>
      {showSearch && <Search />}
      <Flex>
        {showFilters && <Filters />}
        <Tooltip label="Add Network">
          <Link
            href="https://github.com/ethereum-lists/chains/pulls"
            isExternal
          >
            <IconButton size="lg" aria-label="Add" icon={<AddIcon />} mr="1" />
          </Link>
        </Tooltip>
        <Tooltip label="GitHub">
          <Link href="https://github.com/FrederikBolding/chainlist" isExternal>
            <IconButton
              size="lg"
              aria-label="GitHub"
              icon={<FaGithub />}
              mr="1"
            />
          </Link>
        </Tooltip>
        <DarkModeToggle size="lg" mr="1" />
        {!isConnected ? (
          <Button
            w={{ base: "100%", md: "auto" }}
            size="lg"
            onClick={handleConnect}
          >
            Connect
          </Button>
        ) : (
          <Button size="lg" w={{ base: "100%", md: "auto" }}>
            <Text fontSize="sm" isTruncated>
              {address}
            </Text>
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
