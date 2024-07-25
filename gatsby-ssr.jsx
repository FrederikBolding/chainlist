import React from "react";
import { Web3Provider } from "./src/context/Web3Context";
import { SearchProvider } from "./src/context/SearchContext";

export const wrapRootElement = ({ element }) => (
  <SearchProvider>
    <Web3Provider>{element}</Web3Provider>
  </SearchProvider>
);
