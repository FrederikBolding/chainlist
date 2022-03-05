import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { ChainData } from "../types/chain";
import { Chain } from "./Chain";

export const ChainList = ({
  chains,
}: {
  chains: (ChainData & { id: string })[];
}) => (
  <>
    <SimpleGrid columns={3} gap={4}>
      {chains.map((c) => (
        <GridItem key={c.id}>
          <Chain {...c} />
        </GridItem>
      ))}
    </SimpleGrid>
  </>
);
