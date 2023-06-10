import { SimpleGrid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChainData } from "../types/chain";
import { Chain } from "./Chain";
import { SearchContext } from "../context/SearchContext";

export const ChainList = ({
  chains,
  icons,
}: {
  chains: (ChainData & { id: string })[];
}) => {
  const { query } = useContext(SearchContext);
  const lowerCase = query.toLowerCase();
  const filteredChains =
    query.length > 0
      ? chains.filter(
          (chain) =>
            chain.name.toLowerCase().includes(lowerCase) ||
            chain.chainId.toString().includes(query) ||
            chain.nativeCurrency.symbol.toLowerCase().includes(lowerCase)
        )
      : chains;

  return (
    <SimpleGrid minChildWidth="300px" spacing={4}>
      {filteredChains.map((c) => (
        <Chain key={c.id} {...c} icon={icons[c.icon]} />
      ))}
    </SimpleGrid>
  );
};
