import { Badge, Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ChainData } from "../types/chain";

export const Chain = ({ name, chainId, chain, ...rest }: ChainData) => {
  const { isConnected, handleConnect, handleAddChain } =
    useContext(Web3Context);
  const handleAddChainClick = () => {
    handleAddChain({ name, chainId, chain, ...rest });
  };
  return (
    <Box p="5" borderWidth="1px" borderRadius="5px">
      <Flex justifyContent="space-between">
        <Text
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="short"
          isTruncated
        >
          {name}
        </Text>
        <Flex direction="column">
          <Flex justifyContent="flex-end" mb="2">
            <Badge>ChainID: {chainId}</Badge>
          </Flex>
          <Flex justifyContent="flex-end">
            <Badge>Currency: {chain}</Badge>
          </Flex>
        </Flex>
      </Flex>
      <Center mt="2">
        {!isConnected ? (
          <Button onClick={handleConnect}>Connect Wallet</Button>
        ) : (
          <Button onClick={handleAddChainClick}>Add Chain</Button>
        )}
      </Center>
    </Box>
  );
};
