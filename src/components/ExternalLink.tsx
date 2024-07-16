import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";

export const ExternalLink = ({ href, children }) => (
  <Link href={href} isExternal>
    {children} <ExternalLinkIcon mx="2px" />
  </Link>
);
