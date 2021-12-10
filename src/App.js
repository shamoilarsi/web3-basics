import React, { useState } from "react";
import "./App.css";

import { useEthereum } from "./hooks/useEthereum";
import chainIds from "./utils/chainIds";
import { useWeb3 } from "./ethereum/useWeb3";
import { useBasicContract } from "./ethereum/basic";

function App() {
  const { connectToWallet, account, chainId } = useEthereum();
  const contract = useBasicContract();
  const web3 = useWeb3();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onContributeToBasic = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const wei = web3.utils.toWei(e.nativeEvent.target[0].value || "0", "ether");
    try {
      await contract.methods.contribute().send({ from: account, value: wei });
      setMessage("sent eth to contract :thumbsUp");
    } catch (e) {
      setMessage(e.message);
    }
    setLoading(false);
  };

  const onReturnContribution = async () => {
    setLoading(true);
    try {
      await contract.methods.returnContribution().send({ from: account });
      setMessage("received my eth from contract :thumbsUp");
    } catch (e) {
      setMessage(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <button onClick={connectToWallet}>connect to metamask</button>
      <div style={{ paddingTop: "1rem" }} />

      <div>ChainId - {chainIds[chainId]}</div>
      <div>Account - {account}</div>

      <div style={{ paddingTop: "1rem" }} />
      <form onSubmit={onContributeToBasic}>
        <input />
        <button disabled={loading} type="submit">
          contribute eth to basic
        </button>
      </form>

      <div style={{ paddingTop: "1rem" }} />
      <button disabled={loading} onClick={onReturnContribution}>
        send contribution to manager from contract? (only manager can do this)
      </button>

      <div style={{ paddingTop: "2rem" }} />
      <div style={{ color: "gray" }}>{message}</div>
    </div>
  );
}

export default App;
