import { Box } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
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
  return (
    <>
      <Box pt="4" px="8">
        <Header />
        <ChainList chains={chains} />
      </Box>
    </>
  );
};

export default IndexPage;
