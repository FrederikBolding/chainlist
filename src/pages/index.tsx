import { Box } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { ChainList } from "../components/ChainList";
import { Header } from "../components/Header";
import { Seo } from "../components/SEO";
import { Web3Provider } from "../context/Web3Context";
import { SearchProvider } from "../context/SearchContext";

const IndexPage = () => {
  const rawData = useStaticQuery(graphql`
    query ChainsQuery {
      allChain {
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
          status
          faucets
        }
      }
      allImageSharp {
        nodes {
          id
          gatsbyImageData(width: 40, placeholder: NONE)
          parent {
            id
            ... on File {
              id
              name
            }
          }
        }
      }
    }
  `);

  const rawChains = rawData.allChain.nodes;
  const icons = rawData.allImageSharp.nodes.reduce((acc, node) => {
    acc[node.parent.name] = node.gatsbyImageData;
    return acc;
  }, {});

  const chains = rawChains.reduce((acc, chain, idx) => {
    acc[idx].icon = icons[chain.icon];
    return acc;
  }, rawChains);

  return (
    <>
      <Seo />
      <Web3Provider>
        <SearchProvider>
          <Box py="4" px="8">
            <Header />
            <ChainList chains={chains} />
          </Box>
        </SearchProvider>
      </Web3Provider>
    </>
  );
};

export default IndexPage;
