const { createRemoteFileNode } = require("gatsby-source-filesystem");
const fetch = require("node-fetch");

exports.sourceNodes = async ({
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

  chains
    .filter((chain) => chain.rpc.length > 0)
    .forEach((chain) => {
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
