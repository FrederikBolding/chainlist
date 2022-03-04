import { Badge, Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";

export const Chain = ({ name, chainId, chain }) => (
  <Box p="5" borderWidth="1px" borderRadius="5px">
    <Flex justifyContent="space-between">
      <Text fontSize="lg" fontWeight="semibold" lineHeight="short" isTruncated>
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
      <Button>Connect Wallet</Button>
    </Center>
  </Box>
);
