import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { ChainData } from "../types/chain";
import { Image } from "@chakra-ui/react";

export const ChainIcon = ({ icon, name }: Pick<ChainData, "icon" | "name">) =>
  typeof icon === "string" ? (
    <Image src={icon} width="40px" />
  ) : (
    <GatsbyImage objectFit="scale-down" image={icon} alt={name} />
  );
