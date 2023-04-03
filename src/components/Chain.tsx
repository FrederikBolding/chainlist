import {
  Box,
  Button,
  Center,
  Flex,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ChainData } from "../types/chain";
import { GatsbyImage } from "gatsby-plugin-image";

export const Chain = ({
  name,
  chainId,
  nativeCurrency,
  icon,
  explorers,
  rpc,
  ...rest
}: ChainData) => {
  const { colorMode } = useColorMode();
  const { isConnected, handleConnect, handleAddChain } =
    useContext(Web3Context);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDetailsClick = () => onOpen();

  const handleConnectClick = (event) => {
    event.stopPropagation();
    handleConnect();
  };

  const handleAddChainClick = (event) => {
    event.stopPropagation();
    handleAddChain({ name, chainId, nativeCurrency, rpc, explorers, ...rest });
  };

  return (
    <>
      <Flex
        flexDirection="column"
        px="5"
        py="4"
        borderWidth="1px"
        rounded="md"
        boxShadow="base"
        transitionProperty="background-color"
        transitionDuration="150ms"
        _hover={{
          background: colorMode === "light" ? "gray.50" : "whiteAlpha.200",
        }}
        onClick={handleDetailsClick}
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
              <GatsbyImage objectFit="scale-down" image={icon} alt={name} />
            </Flex>
          )}
        </Flex>
        <Center mt="auto">
          {!isConnected ? (
            <Button onClick={handleConnectClick}>Connect Wallet</Button>
          ) : (
            <Button onClick={handleAddChainClick}>Add Chain</Button>
          )}
        </Center>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
              <Box>
                <Text fontWeight="medium">RPC URLs</Text>
                {rpc.map((r) => (
                  <Text>{r}</Text>
                ))}
              </Box>
              <Box mt="1">
                <Text fontWeight="medium">Explorer URLs</Text>
                {explorers?.map((e) => (
                  <Text>{e.url}</Text>
                ))}
              </Box>
            </ModalBody>

            <ModalFooter>
              {!isConnected ? (
                <Button mr="2" onClick={handleConnectClick}>
                  Connect Wallet
                </Button>
              ) : (
                <Button mr="2" onClick={handleAddChainClick}>
                  Add Chain
                </Button>
              )}
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};
