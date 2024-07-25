import React from "react";
import { Badge, Tooltip } from "@chakra-ui/react";
import { ChainData } from "../types/chain";

export const RedFlagBadge = ({ redFlags }: Pick<ChainData, "redFlags">) => {
  if (!redFlags || redFlags.length === 0) {
    return null;
  }
  const flagLabel =
    redFlags[0] === "reusedChainId"
      ? "Flagged for reusing chain ID"
      : "Flagged for unknown reasons";
  return (
    <Tooltip label={flagLabel}>
      <Badge colorScheme="red" textTransform="capitalize">
        Flagged
      </Badge>
    </Tooltip>
  );
};
