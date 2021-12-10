const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const env = require("dotenv").config();

const Basic = require("./build/Basic.json");

const provider = new HDWalletProvider(
  env.parsed.MNEMONIC,
  env.parsed.RINKEBY_ENDPOINT
);
const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(Basic.interface))
    .deploy({ data: Basic.bytecode, arguments: ["100"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
})();

// deployed at 0x1d7722733943a996b9E8388e92f19a29e6884BE9
