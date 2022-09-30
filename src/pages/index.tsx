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
      allImageSharp {
        nodes {
          id
          gatsbyImageData(width: 40)
          original {
            width
            height
            src
          }
          fluid {
            originalName
          }
        }
      }
    }
  `);

  const chains = rawData.allChainsJson.nodes;
  const icons = rawData.allImageSharp.nodes.reduce((acc, node) => {
    return {
      ...acc,
      [node.fluid.originalName.split(".")[0]]: node.gatsbyImageData,
    };
  }, {});
  const [searchQuery, setSearchQuery] = useState("");
  const filteredChains =
    searchQuery.length > 0
      ? chains.filter(
          (chain) =>
            chain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chain.chainId.toString().includes(searchQuery) ||
            chain.nativeCurrency.symbol
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : chains;

  return (
    <Web3Provider>
      <Seo />
      <Box py="4" px="8">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ChainList chains={filteredChains} icons={icons} />
      </Box>
    </Web3Provider>
  );
};

export default IndexPage;
