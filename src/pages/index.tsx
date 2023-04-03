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

  const chains = rawData.allChain.nodes;
  const icons = rawData.allImageSharp.nodes.reduce((acc, node) => {
    return {
      ...acc,
      [node.parent.name]: node.gatsbyImageData,
    };
  }, {});

  return (
    <Web3Provider>
      <Seo />
      <SearchProvider>
        <Box py="4" px="8">
          <Header />
          <ChainList chains={chains} icons={icons} />
        </Box>
      </SearchProvider>
    </Web3Provider>
  );
};

export default IndexPage;
