import React, { useContext } from "react";
import {
  Button,
  Flex,
  StatGroup,
  StatLabel,
  Stat,
  Heading,
  Divider,
  Text,
} from "@chakra-ui/react";
import { graphql } from "gatsby";
import { Seo } from "../../components/SEO";
import { Web3Context } from "../../context/Web3Context";
import { ChainIcon } from "../../components/ChainIcon";
import { Layout } from "../../components/Layout";
import { ExternalLink } from "../../components/ExternalLink";
import { RpcTable } from "../../components/RpcTable";
import { RedFlagBadge } from "../../components/RedFlagBadge";
import { StatusBadge } from "../../components/StatusBadge";
import { StatValue } from "../../components/StatValue";
import { ChainData } from "../../types/chain";

const ChainPage = ({ data }: { data: { chain: ChainData } }) => {
  const {
    name,
    chainId,
    nativeCurrency,
    icon,
    explorers,
    rpc,
    redFlags,
    infoURL,
    status,
  } = data.chain;

  const { isConnected, handleConnect, handleAddChain } =
    useContext(Web3Context);

  const handleAddChainClick = () => {
    handleAddChain({ name, chainId, nativeCurrency, rpc, explorers });
  };

  const handleRpcClick = (rpc: string) => {
    handleAddChain({ name, chainId, nativeCurrency, rpc: [rpc], explorers });
  };

  return (
    <>
      <Seo />
      <Layout headerProps={{ showSearch: false, showFilters: false }}>
        <Flex flexDirection="column" mt={["0", null, "8"]}>
          <Flex
            flexDirection={["column", null, "row"]}
            justifyContent="space-between"
            alignItems="center"
            gap="6"
          >
            <Flex
              flexDirection={["column", null, "row"]}
              alignItems="center"
              gap="6"
            >
              {icon && (
                <Flex>
                  <ChainIcon name={name} icon={icon} width="60px" />
                </Flex>
              )}
              <Heading size="2xl">{name}</Heading>
            </Flex>
            {!isConnected ? (
              <Button onClick={handleConnect}>Connect</Button>
            ) : (
              <Button onClick={handleAddChainClick}>Add Chain</Button>
            )}
          </Flex>
          <Divider my="8" />
          <StatGroup flexDirection={["column", null, "row"]} gap={[2, null, 0]}>
            <Stat>
              <StatLabel>Chain ID</StatLabel>
              <StatValue>
                <Text>{chainId}</Text>
              </StatValue>
            </Stat>
            <Stat>
              <StatLabel>Currency</StatLabel>
              <StatValue>
                <Text>{nativeCurrency.symbol}</Text>
              </StatValue>
            </Stat>
            <Stat>
              <StatLabel mb="1.5">Status</StatLabel>
              <StatValue>
                <StatusBadge status={status} />
                <RedFlagBadge redFlags={redFlags} />
              </StatValue>
            </Stat>
            {infoURL && (
              <Stat>
                <StatLabel>Info</StatLabel>
                <StatValue>
                  <ExternalLink href={infoURL}>{infoURL}</ExternalLink>
                </StatValue>
              </Stat>
            )}
            {explorers && (
              <Stat>
                <StatLabel>Explorers</StatLabel>
                <StatValue>
                  {explorers.map((explorer) => (
                    <ExternalLink href={explorer.url}>
                      {explorer.url}
                    </ExternalLink>
                  ))}
                </StatValue>
              </Stat>
            )}
          </StatGroup>
          <Divider my="8" />
          <RpcTable chainId={chainId} rpcs={rpc} handleRpcClick={handleRpcClick} />
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
      redFlags
      infoURL
    }
  }
`;

export default ChainPage;
