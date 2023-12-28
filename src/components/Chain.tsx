import {
  Button,
  Center,
  Flex,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ChainData } from "../types/chain";
import { ChainIcon } from "./ChainIcon";

export const Chain = ({
  name,
  chainId,
  nativeCurrency,
  icon,
  ...rest
}: ChainData) => {
  const { isConnected, handleConnect, handleAddChain } =
    useContext(Web3Context);
  const handleAddChainClick = () => {
    handleAddChain({ name, chainId, nativeCurrency, ...rest });
  };
  return (
    <Flex
      flexDirection="column"
      px="5"
      py="4"
      borderWidth="1px"
      rounded="md"
      boxShadow="base"
    >
      <Flex justifyContent="space-between">
        <Flex flexDirection="column" minW="200px">
          <Flex mb="2">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              lineHeight="short"
              isTruncated
              verticalAlign="middle"
            >
              {name}
            </Text>
          </Flex>
          <StatGroup mb="2">
            <Stat>
              <StatLabel>Chain ID</StatLabel>
              <StatNumber fontSize="md">{chainId}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Currency</StatLabel>
              <StatNumber fontSize="md">{nativeCurrency.symbol}</StatNumber>
            </Stat>
          </StatGroup>
        </Flex>
        {icon && (
          <Flex>
            <ChainIcon name={name} icon={icon} />
          </Flex>
        )}
      </Flex>
      <Center mt="auto">
        {!isConnected ? (
          <Button onClick={handleConnect}>Connect Wallet</Button>
        ) : (
          <Button onClick={handleAddChainClick}>Add Chain</Button>
        )}
      </Center>
    </Flex>
  );
};
