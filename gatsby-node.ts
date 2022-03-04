import { GatsbyNode } from "gatsby";
import fetch from "node-fetch";

// @todo flesh out
interface ChainData {
  name: string;
  chain: string;
  icon: string;
  rpc: string[];
  chainId: number;
}

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  const response = await fetch("https://chainid.network/chains.json");
  const data = (await response.json()) as ChainData[];
  data.forEach((chain) => {
    const node = {
      ...chain,
      parent: null,
      children: [],
      id: createNodeId(`chain__${chain.chainId}`),
      internal: {
        type: "Chain",
        content: JSON.stringify(chain),
        contentDigest: createContentDigest(chain),
      },
    };
    createNode(node);
  });
};
