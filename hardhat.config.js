require("@nomiclabs/hardhat-waffle");

require('dotenv').config();

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://polygon-rpc.com/",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  // etherscan: {
  //   apiKey: process.env.POLYGONSCAN_API_KEY
  // },
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
