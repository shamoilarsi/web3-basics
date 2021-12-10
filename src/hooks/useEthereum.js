import { createContext, useContext, useEffect, useState } from "react";

const { ethereum } = window;
const Context = createContext();

const handleAccountsChanged = (_accounts) => window.location.reload();
const handleChainIdChanged = (_chainId) => window.location.reload();

const EthereumProvider = ({ children }) => {
  const [account, setAccount] = useState([]);
  const [chainId, setChainId] = useState(null);

  const connectToWallet = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      const chainId = await ethereum.request({ method: "eth_chainId" });
      setChainId(chainId);

      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainIdChanged);
    } else {
      alert("MetaMask extension not found");
    }
  };

  useEffect(() => {
    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainIdChanged);
    };
  }, []);

  return (
    <Context.Provider value={{ ethereum, account, chainId, connectToWallet }}>
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
