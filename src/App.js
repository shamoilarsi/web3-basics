import { useEthereum } from "./hooks/useEthereum";
import "./App.css";
import { useEffect } from "react";

function App() {
  const { ethereum } = useEthereum();

  useEffect(() => {
    (async () => {})();

    return () => {};
  }, []);

  return <div className="App"></div>;
}

export default App;
