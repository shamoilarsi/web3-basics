import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setWeb3(new Web3(provider));
      }
    })();
    return () => {};
  }, []);

  return web3;
};

export { useWeb3 };
