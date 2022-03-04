import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

export const Search = () => (
  <InputGroup size="lg" mx="5">
    <InputLeftElement
      pointerEvents="none"
      children={<SearchIcon color="gray.300" />}
    />
    <Input type="text" placeholder="Search" />
  </InputGroup>
);
