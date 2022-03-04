import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Chain } from "./Chain";

export const ChainList = ({ chains }) => (
  <>
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      {chains.map((c) => (
        <GridItem key={c.id}>
          <Chain {...c} />
        </GridItem>
      ))}
    </Grid>
  </>
);
