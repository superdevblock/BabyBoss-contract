
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();


// const { privatekey } = require('./.env.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        },
      },
      
    ],
  },
  networks: {
    mainnet: {
      url: process.env.MAINNET_URL || "",
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    polygon: {
      url: process.env.MATIC_URL || "",
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },

    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 30000000000,
      // accounts: {privatekey: privatekey},
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 30000000000,
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },

    ftmTestnet: {
      url: "https://rpc.testnet.fantom.network/",
      chainId: 4002,
      // gasPrice: 30000000000,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
      // accounts: {privatekey: privatekey},
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
    opera: {
      url: "https://rpcapi.fantom.network/",
      chainId: 250,
      // gasPrice: 30000000000,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
      // accounts: {privatekey: privatekey},
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },

    oasisTestnet: {
      url: "https://testnet.emerald.oasis.dev/",
      chainId: 42261,
      gasPrice: 30000000000,
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },

    oasisMainnet: {
      url: "https://emerald.oasis.dev/",
      chainId: 42262,
      gasPrice: 30000000000,
      // accounts: {mnemonic: process.env.MNEMONIC,}
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
  etherscan: {
    apiKey: 
    {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.MATIC_API_KEY,
      polygonMumbai: process.env.MATIC_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      ftmTestnet: process.env.FTMSCAN_API_KEY,
    },
  },

};
