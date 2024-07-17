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
  Divider,
} from "@chakra-ui/react";
import { graphql } from "gatsby";
import { Seo } from "../../components/SEO";
import { SearchProvider } from "../../context/SearchContext";
import { Web3Context, Web3Provider } from "../../context/Web3Context";
import { ChainIcon } from "../../components/ChainIcon";
import { Layout } from "../../components/Layout";
import { ExternalLink } from "../../components/ExternalLink";
import { RpcTable } from "../../components/RpcTable";

const ChainPage = ({ data }) => {
  const {
    name,
    chainId,
    nativeCurrency,
    icon,
    explorers,
    rpc,
    slip44,
    infoURL,
    status,
  } = data.chain;

  const { isConnected, handleConnect, handleAddChain } =
    useContext(Web3Context);

  const handleAddChainClick = () => {
    handleAddChain({ name, chainId, nativeCurrency, rpc, explorers });
  };

  const handleRpcClick = (rpc) => {
    handleAddChain({ name, chainId, nativeCurrency, rpc: [rpc], explorers });
  };

  return (
    <>
      <Seo />
      <Layout headerProps={{ showSearch: false, showFilters: false }}>
        <Flex flexDirection="column" mt="8">
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              {icon && (
                <Flex mr="6">
                  <ChainIcon name={name} icon={icon} width="60px" />
                </Flex>
              )}
              <Heading size="2xl">{name}</Heading>
            </Flex>
            {!isConnected ? (
              <Button onClick={handleConnect}>Connect Wallet</Button>
            ) : (
              <Button onClick={handleAddChainClick}>Add Chain</Button>
            )}
          </Flex>
          <Divider my="8" />
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
              <StatLabel>Status</StatLabel>
              <StatNumber fontSize="md" textTransform="capitalize">
                {status ?? "Active"}
              </StatNumber>
            </Stat>
            {infoURL && (
              <Stat>
                <StatLabel>Info</StatLabel>
                <StatNumber fontSize="md">
                  <ExternalLink href={infoURL}>{infoURL}</ExternalLink>
                </StatNumber>
              </Stat>
            )}
            {explorers && (
              <Stat>
                <StatLabel>Explorers</StatLabel>
                <StatNumber fontSize="md">
                  {explorers.map((explorer) => (
                    <ExternalLink href={explorer.url}>
                      {explorer.url}
                    </ExternalLink>
                  ))}
                </StatNumber>
              </Stat>
            )}
          </StatGroup>
          <Divider my="8" />
          <RpcTable rpcs={rpc} handleRpcClick={handleRpcClick} />
        </Flex>
      </Layout>
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
          gatsbyImageData(width: 60, placeholder: NONE)
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
      infoURL
    }
  }
`;

export default ChainPage;
