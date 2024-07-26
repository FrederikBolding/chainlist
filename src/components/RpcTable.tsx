import React, { useContext } from "react";
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

export const RpcTable = ({ rpcs, handleRpcClick }) => {
  const { isConnected, handleConnect } = useContext(Web3Context);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th pl="0">RPC URL</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {rpcs.map((rpcUrl) => (
            <Tr>
              <Td pl="0">{rpcUrl}</Td>
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
