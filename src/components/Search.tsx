import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { useDebounce } from "../hooks/useDebounce";

export const Search = () => {
  const { setQuery } = useContext(SearchContext);
  const [inputQuery, setInputQuery] = useState("");
  const handleChange = (event) => setInputQuery(event.target.value);
  const debouncedQuery = useDebounce(inputQuery, 250);

  useEffect(() => {
    setQuery(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <InputGroup size="lg" mx={{ base: 0, md: "5" }} mb={{ base: "2", md: 0 }}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        type="text"
        placeholder="Search"
        value={inputQuery}
        onChange={handleChange}
      />
    </InputGroup>
  );
};
