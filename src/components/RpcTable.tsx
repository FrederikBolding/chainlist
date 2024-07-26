import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Web3Context } from "../context/Web3Context";
import { JsonRpcProvider } from "ethers";
import { ChainData } from "../types/chain";

async function checkRpc(chainId: number, rpc: string) {
  try {
    const now = Date.now();
    const provider = new JsonRpcProvider(rpc, chainId, { staticNetwork: true });
    const blockNumber = await provider.getBlockNumber();
    return { blockNumber, latency: Date.now() - now };
  } catch {
    return null;
  }
}

export const RpcTable = ({
  chainId,
  rpcs,
  handleRpcClick,
}: Pick<ChainData, "chainId"> & { rpcs: ChainData["rpc"] }) => {
  const { isConnected, handleConnect } = useContext(Web3Context);
  const [rpcResults, setRpcResults] = useState(null);

  useEffect(() => {
    Promise.all(rpcs.map((rpc) => checkRpc(chainId, rpc))).then(setRpcResults);
  }, []);

  const mergedRpcs = rpcs
    .map((rpcUrl, index) => {
      const rpcResult = rpcResults?.[index] ?? {};
      return { rpcUrl, ...rpcResult };
    })
    .sort((a, b) => {
      if (!a.latency) {
        return 1;
      }
      if (!b.latency) {
        return -1;
      }
      return a.latency < b.latency ? -1 : 1;
    });

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th pl="0">RPC URL</Th>
            <Th>Block Number</Th>
            <Th>Latency</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {mergedRpcs.map(({ rpcUrl, blockNumber, latency }) => {
            return (
              <Tr key={rpcUrl}>
                <Td pl="0">{rpcUrl}</Td>
                <Td>{blockNumber ?? "?"}</Td>
                <Td>{latency ?? "?"} ms</Td>
                <Td pr="0" textAlign="end">
                  {!isConnected ? (
                    <Button onClick={handleConnect}>Connect</Button>
                  ) : (
                    <Button onClick={() => handleRpcClick(rpcUrl)}>
                      Add Chain
                    </Button>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
