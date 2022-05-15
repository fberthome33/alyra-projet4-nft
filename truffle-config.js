const path = require('path');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {

    ganache: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      
    },
    develop: {
      port: 8545
    },
    kovan: {
      provider: () => new HDWalletProvider(`${process.env.MNEMONIC}`, `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
      from: "0x362e75e2744Fa57f7F272913b692c6bFbF5692da",
      network_id: 42,
      //gas: 3000000,
      //gasPrice: 10000000000
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    reporter: 'eth-gas-reporter',
    
    reporterOptions : {
      gasPrice: 1,
      token: 'ETH',
      showTimeSpent: true,
    }
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
  plugins: ["solidity-coverage"],

// Truffle DB is currently disabled by default; to enable it, change enabled:
// false to enabled: true. The default storage location can also be
// overridden by specifying the adapter settings, as shown in the commented code below.
//
// NOTE: It is not possible to migrate your contracts to truffle DB and you should
// make a backup of your artifacts to a safe location before enabling this feature.
//
// After you backed up your artifacts you can utilize db by running migrate as follows: 
// $ truffle migrate --reset --compile-all
//
// db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
// }
};

