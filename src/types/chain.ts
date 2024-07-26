import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ChainData {
  name: string;
  chain: string;
  icon: {
    publicURL: string;
    childImageSharp: { gatsbyImageData: IGatsbyImageData };
  };
  rpc: string[];
  chainId: number;
  nativeCurrency: ChainCurrency;
  explorers?: BlockExplorer[];
  status?: string;
  redFlags?: string[];
  infoURL?: string;
}

export interface ChainCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface BlockExplorer {
  name: string;
  url: string;
  standard: string;
}
