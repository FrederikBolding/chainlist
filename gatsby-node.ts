import { GatsbyNode } from "gatsby";
import fetch from "node-fetch";
import path from "path";
import webpack from "webpack";
import { ChainData } from "./src/types/chain";

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

// https://github.com/WalletConnect/walletconnect-monorepo/issues/584
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        util: path.resolve(`./node_modules/util/`),
        url: path.resolve(`./node_modules/url/`),
        assert: path.resolve(`./node_modules/assert/`),
        crypto: path.resolve(`./node_modules/crypto-browserify`),
        os: path.resolve(`./node_modules/os-browserify/browser`),
        https: path.resolve(`./node_modules/https-browserify`),
        http: path.resolve(`./node_modules/stream-http`),
        stream: path.resolve(`./node_modules/stream-browserify`),
      },
    },
  });
};
