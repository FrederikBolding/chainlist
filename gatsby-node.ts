import { GatsbyNode } from "gatsby";
import path from "path";
import webpack from "webpack";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import fetch from "node-fetch";

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
  store,
  cache,
  reporter,
}) => {
  const { createNode } = actions;

  const chains = await fetch("https://chainid.network/chains.json").then(
    (response) => response.json()
  );

  const icons = await fetch("https://chainid.network/chain_icons.json").then(
    (response) => response.json()
  );

  const iconFiles = await icons.reduce(async (previousPromise, icon) => {
    const iconName = icon.name;
    const iconFile = icon.icons?.[0];
    const cid = iconFile.url.slice(7);
    const result = await createRemoteFileNode({
      url: `https://chainid.network/iconsDownload/${cid}`,
      createNode,
      createNodeId,
      store,
      cache,
      reporter,
      name: iconName,
      ext: `.${iconFile.format}`,
    }).catch(() => null);
    const acc = await previousPromise;
    if (result) {
      acc[iconName] = result;
    }
    return acc;
  }, Promise.resolve({}));

  chains.forEach((chain) => {
    const icon = chain.icon;
    const iconCid = iconFiles[icon]?.name;
    const node = {
      ...chain,
      icon: iconCid,
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
