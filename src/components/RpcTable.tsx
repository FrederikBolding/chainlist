import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Skeleton,
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

interface RpcResult {
  rpcUrl: string;
  blockNumber?: number;
  latency?: number;
  error?: unknown;
}

async function checkRpc(chainId: number, rpcUrl: string): Promise<RpcResult> {
  try {
    const now = Date.now();
    const provider = new JsonRpcProvider(rpcUrl, chainId, {
      staticNetwork: true,
    });
    const blockNumber = await provider.getBlockNumber();
    return { rpcUrl, blockNumber, latency: Date.now() - now };
  } catch (error) {
    return { rpcUrl, error };
  }
}

export const RpcTable = ({
  chainId,
  rpcs,
  handleRpcClick,
}: Pick<ChainData, "chainId"> & {
  rpcs: ChainData["rpc"];
  handleRpcClick: (rpc: string) => void;
}) => {
  const { isConnected, handleConnect } = useContext(Web3Context);
  const [rpcResults, setRpcResults] = useState<RpcResult[] | null>(null);

  useEffect(() => {
    rpcs.forEach((rpc) =>
      checkRpc(chainId, rpc).then((result) => {
        setRpcResults((state) => [...(state ?? []), result]);
      })
    );
  }, []);

  const mergedRpcs = rpcs
    .map((rpcUrl) => {
      const rpcResult = rpcResults?.find((result) => result.rpcUrl === rpcUrl);
      return rpcResult ?? { rpcUrl };
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
          {mergedRpcs.map(({ rpcUrl, blockNumber, latency, error }) => {
            return (
              <Tr key={rpcUrl}>
                <Td pl="0">{rpcUrl}</Td>
                <Td>
                  {blockNumber || error ? (
                    blockNumber ?? "Unavailable"
                  ) : (
                    <Skeleton height="24px" />
                  )}
                </Td>
                <Td>
                  {latency || error ? (
                    <>{latency ?? "?"} ms</>
                  ) : (
                    <Skeleton height="24px" />
                  )}
                </Td>
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
