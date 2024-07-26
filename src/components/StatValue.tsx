import React from "react";
import { VStack } from "@chakra-ui/react";

export const StatValue = ({ children }: { children: React.ReactNode }) => (
  <VStack align="start" gap="1">
    {children}
  </VStack>
);
