import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { ChainData } from "../types/chain";
import { Image } from "@chakra-ui/react";

export const ChainIcon = ({ icon, name, width = "40px" }: Pick<ChainData, "icon" | "name"> & { width?: string; }) =>
  icon.childImageSharp ? (
    <GatsbyImage
      objectFit="scale-down"
      image={icon.childImageSharp.gatsbyImageData}
      alt={name}
    />
  ) : (
    <Image src={icon.publicURL} width={width} />
  );
