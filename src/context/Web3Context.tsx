import WalletConnectProvider from "@walletconnect/ethereum-provider";
import React, { createContext, useEffect, useState } from "react";
import { BrowserProvider as EthersWeb3 } from "ethers";
import { ChainData } from "../types/chain";

// Hack to fix build
const Web3Modal = typeof window !== `undefined` ? require("web3modal") : null;

// Wrapper to continue use of Web3Modal with new WC version
class WalletConnectWrapper {
  #provider: WalletConnectProvider | null = null;
  constructor() {}

  async enable() {
    const provider = await WalletConnectProvider.init({
      projectId: "d0868226f60fea6aaad64b3f6a3dc3a7",
      chains: [1],
      showQrModal: true,
      methods: ["wallet_addEthereumChain"],
    });

    this.#provider = provider;

    await provider.connect();
  }

  on(event: any, listener: any) {
    this.#provider!.on(event, listener);
  }

  async request(args: any) {
    return this.#provider!.request(args);
  }
}

export const Web3Context = createContext({});

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState<any | undefined>(undefined);
  const [address, setAddress] = useState(undefined);

  const providerOptions = {
    walletconnect: {
      package: WalletConnectWrapper,
      options: {
        infuraId: 'foo' // This doesnt seem to be used
      }
    },
  };

  const web3Modal =
    Web3Modal &&
    new Web3Modal.default({
      cacheProvider: true, // optional
      providerOptions, // required
    });

  const handleConnect = () => {
    web3Modal.connect().then(setWeb3);
  };

  const isConnected = web3 !== undefined;
  const provider = isConnected && new EthersWeb3(web3, "any");

  const handleAddChain = (chain: ChainData) => {
    if (!provider) {
      return;
    }
    const { nativeCurrency, explorers } = chain;
    const blockExplorerUrls =
      explorers && explorers.length > 0 ? explorers.map((e) => e.url) : null;
    provider.send("wallet_addEthereumChain", [
      {
        chainId: `0x${chain.chainId.toString(16)}`,
        chainName: chain.name,
        nativeCurrency,
        rpcUrls: chain.rpc,
        blockExplorerUrls,
      },
    ]);
  };

  const updateInfo = () => {
    if (!provider) {
      return;
    }
    provider
      .getSigner()
      .then((signer) => signer.getAddress().then((res) => setAddress(res)));
  };

  useEffect(() => {
    if (web3) {
      updateInfo();
      web3.on("accountsChanged", updateInfo);
      web3.on("chainChanged", updateInfo);
    }
  }, [web3]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        setWeb3,
        handleConnect,
        isConnected,
        handleAddChain,
        address,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
