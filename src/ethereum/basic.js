import { useWeb3 } from "./useWeb3";
import Basic from "./build/Basic.json";

const useBasicContract = () => {
  const web3 = useWeb3();
  let contractInstance;
  if (web3) {
    contractInstance = new web3.eth.Contract(
      JSON.parse(Basic.interface),
      "0x1d7722733943a996b9E8388e92f19a29e6884BE9"
    );
  }
  return contractInstance;
};

export { useBasicContract };
