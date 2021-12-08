import { createContext, useContext, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const { ethereum } = window;
const Context = createContext();

const handleAccountsChanged = (_accounts) => window.location.reload();
const handleChainIdChanged = (_chainId) => window.location.reload();

const EthereumProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState([]);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    (async () => {
      if (ethereum) {
        const provider = await detectEthereumProvider();
        if (provider) setWeb3(new Web3(provider));

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        const chainId = await ethereum.request({ method: "eth_chainId" });
        setChainId(chainId);

        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainIdChanged);
      } else {
        alert("MetaMask Not Found");
      }
    })();
    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainIdChanged);
    };
  }, []);

  return (
    <Context.Provider value={{ ethereum, web3, account, chainId }}>
      {children}
    </Context.Provider>
  );
};

const useEthereum = () => {
  if (!Context)
    throw new Error("useEthereum cannot be used outside EthereumProvider");
  return useContext(Context);
};

export { EthereumProvider, useEthereum };
