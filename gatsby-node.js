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

  async function fetchIcon(name, file) {
    const cid = file.url.slice(7);

    // Try iconsDownload first as it is way faster.
    try {
      return await createRemoteFileNode({
        url: `https://chainid.network/iconsDownload/${cid}`,
        createNode,
        createNodeId,
        store,
        cache,
        reporter,
        name,
        ext: `.${file.format}`,
      });
    } catch {}

    // Fallback to IPFS
    try {
      return await createRemoteFileNode({
        url: `https://ipfs.io/ipfs/${cid}`,
        createNode,
        createNodeId,
        store,
        cache,
        reporter,
        name,
        ext: `.${file.format}`,
      });
    } catch {}

    return null;
  }

  const iconFiles = await icons.reduce(async (previousPromise, icon) => {
    const iconName = icon.name;
    const iconFile = icon.icons?.[0];
    const result = await fetchIcon(iconName, iconFile);
    const acc = await previousPromise;
    if (result) {
      acc[iconName] = result;
    }
    return acc;
  }, Promise.resolve({}));

  chains
    // Filter out non HTTP(S) RPC URLs
    .map((chain) => ({ ...chain, rpc: chain.rpc.filter(rpc => rpc.startsWith('http://') || rpc.startsWith('https://'))}))
    .filter((chain) => chain.rpc.length > 0)
    .forEach((chain) => {
      const icon = chain.icon;
      const iconFileId = iconFiles[icon]?.id;
      const chainData = { ...chain, icon: iconFileId };
      const node = {
        ...chainData,
        parent: null,
        children: [],
        id: createNodeId(`chain__${chainData.chainId}`),
        internal: {
          type: "Chain",
          content: JSON.stringify(chainData),
          contentDigest: createContentDigest(chainData),
        },
      };
      createNode(node);
    });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Chain implements Node {
      icon: File @link(from: "icon")
    }
  `;
  createTypes(typeDefs);
};
