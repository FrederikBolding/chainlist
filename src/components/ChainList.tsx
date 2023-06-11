import { SimpleGrid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChainData } from "../types/chain";
import { Chain } from "./Chain";
import { SearchContext } from "../context/SearchContext";

export const ChainList = ({
  chains,
}: {
  chains: (ChainData & { id: string })[];
}) => {
  const { query, showTestnets, showDeprecated } = useContext(SearchContext);
  const lowerCaseQuery = query.toLowerCase();

  const handleFiltering = (chain) => {
    const lowerCaseName = chain.name.toLowerCase();
    const isTestnet = !showTestnets && (chain.faucets.length > 0 || lowerCaseName.includes("testnet"));
    const isDeprecated = !showDeprecated && chain.status === "deprecated";
    if (isTestnet || isDeprecated) {
      return false;
    }
    if (query.length > 0) {
      return (
        chain.name.toLowerCase().includes(lowerCaseQuery) ||
        chain.chainId.toString().includes(query) ||
        chain.nativeCurrency.symbol.toLowerCase().includes(lowerCaseQuery)
      );
    }
    return true;
  };

  const filteredChains = chains.filter(handleFiltering);

  return (
    <SimpleGrid minChildWidth="300px" spacing={4}>
      {filteredChains.map((c) => (
        <Chain key={c.id} {...c} />
      ))}
    </SimpleGrid>
  );
};
