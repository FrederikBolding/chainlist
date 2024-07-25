import React from "react";
import { Badge } from "@chakra-ui/react";
import { ChainData } from "../types/chain";

export const StatusBadge = ({ status }: Pick<ChainData, "status">) => {
  const actualStatus = status ?? "Active";
  const colorScheme = status === "deprecated" ? "yellow" : undefined;
  return (
    <Badge textTransform="capitalize" colorScheme={colorScheme}>
      {actualStatus}
    </Badge>
  );
};
