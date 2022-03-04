import { Box } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { ChainList } from "../components/ChainList";
import { Header } from "../components/Header";

const IndexPage = () => {
  const rawData = useStaticQuery(graphql`
    query ChainsQuery {
      allChain {
        edges {
          node {
            id
            name
            chain
            chainId
            rpc
            icon
          }
        }
      }
    }
  `);
  const chains = rawData.allChain.edges.map((n) => n.node);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredChains =
    searchQuery.length > 0
      ? chains.filter(
          (chain) =>
            chain.name.toLowerCase().includes(searchQuery) ||
            chain.chainId.toString().includes(searchQuery)
        )
      : chains;
  return (
    <Box pt="4" px="8">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ChainList chains={filteredChains} />
    </Box>
  );
};

export default IndexPage;
