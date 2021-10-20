const path = require("path");

const HDWalletProvider = require("@truffle/hdwallet-provider")
const infuraKey = "74571e71f01d4c8497796cceb95d4a0a"
const fs = require("fs")
const mnemonic = fs.readFileSync(".secret").toString().trim()

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  contracts_directory: path.join(__dirname, "/contracts"),
  contracts_build_directory: path.join(__dirname, "client/src/artifacts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      // provider: () =>
      //   new HDWalletProvider(
      //     mnemonic,
      //     `https://ropsten.infura.io/v3/${infuraKey}`
      //   ),
      provider: new HDWalletProvider(
        mnemonic,
        `https://ropsten.infura.io/v3/${infuraKey}`
      ),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
  

};
