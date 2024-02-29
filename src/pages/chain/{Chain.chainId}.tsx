import React, { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  StatGroup,
  StatLabel,
  Stat,
  StatNumber,
  Heading,
  Text,
} from "@chakra-ui/react";
import { graphql } from "gatsby";
import { Seo } from "../../components/SEO";
import { SearchProvider } from "../../context/SearchContext";
import { Web3Context, Web3Provider } from "../../context/Web3Context";
import { Header } from "../../components/Header";
import { ChainIcon } from "../../components/ChainIcon";
import { Layout } from "../../components/Layout";

const ChainPage = ({ data }) => {
  const { name, chainId, nativeCurrency, icon, explorers, rpc, slip44 } =
    data.chain;

  const { isConnected, handleConnect, handleAddChain } =
    useContext(Web3Context);
  const handleAddChainClick = () => {
    handleAddChain({ name, chainId, nativeCurrency, ...rest });
  };

  return (
    <>
      <Seo />
      <Web3Provider>
        <SearchProvider>
          <Layout headerProps={{ showSearch: false, showFilters: false }}>
            <Flex flexDirection="column">
              <Flex justifyContent="space-between" alignItems="center" mb="2">
                <Flex alignItems="center">
                  {icon && (
                    <Flex mr="2">
                      <ChainIcon name={name} icon={icon} />
                    </Flex>
                  )}
                  <Heading as="h3" size="lg">
                    {name}
                  </Heading>
                </Flex>
                {!isConnected ? (
                  <Button onClick={handleConnect}>Connect Wallet</Button>
                ) : (
                  <Button onClick={handleAddChainClick}>Add Chain</Button>
                )}
              </Flex>
              <StatGroup>
                <Stat>
                  <StatLabel>Chain ID</StatLabel>
                  <StatNumber fontSize="md">{chainId}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Currency</StatLabel>
                  <StatNumber fontSize="md">{nativeCurrency.symbol}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>SLIP44</StatLabel>
                  <StatNumber fontSize="md">{slip44}</StatNumber>
                </Stat>
              </StatGroup>
              <Text fontWeight="semibold" mt="2">
                RPC URLs
              </Text>
              {rpc.map((rpcUrl) => (
                <Text>{rpcUrl}</Text>
              ))}
              <Text fontWeight="semibold" mt="2">
                Explorers
              </Text>
              {explorers.map((explorer) => (
                <Text>{explorer.url}</Text>
              ))}
            </Flex>
          </Layout>
        </SearchProvider>
      </Web3Provider>
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    chain(id: { eq: $id }) {
      id
      name
      chain
      chainId
      rpc
      icon {
        publicURL
        childImageSharp {
          gatsbyImageData(width: 40, placeholder: NONE)
        }
      }
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
      slip44
    }
  }
`;

export default ChainPage;
