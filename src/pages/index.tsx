import { Box } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { ChainList } from "../components/ChainList";
import { Header } from "../components/Header";
import { Seo } from "../components/SEO";
import { Web3Provider } from "../context/Web3Context";

const IndexPage = () => {
  const rawData = useStaticQuery(graphql`
    query ChainsQuery {
      allChainsJson {
        nodes {
          id
          name
          chain
          chainId
          rpc
          icon
          nativeCurrency {
            decimals
            name
            symbol
          }
          explorers {
            url
            name
            standard
          }
        }
      }
    }
  `);
  const chains = rawData.allChainsJson.nodes;
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
    <Web3Provider>
      <Seo />
      <Box pt="4" px="8">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ChainList chains={filteredChains} />
      </Box>
    </Web3Provider>
  );
};

export default IndexPage;
