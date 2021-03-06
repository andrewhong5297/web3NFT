require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require("hardhat-gas-reporter");

const fs = require("fs");

const defaultNetwork = "mumbai"; 

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
    }
  }
  return "";
}

module.exports = {
  defaultNetwork,

  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/60be357b5edc4233a1873fb661ad1682",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/60be357b5edc4233a1873fb661ad1682",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/60be357b5edc4233a1873fb661ad1682",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    kovan: {
      url: "https://kovan.infura.io/v3/60be357b5edc4233a1873fb661ad1682",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    goerli: {
      url: "https://goerli.infura.io/v3/60be357b5edc4233a1873fb661ad1682",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/60be357b5edc4233a1873fb661ad1682",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    polygon: {
      url: "https://polygon-mainet.infura.io/v3/60be357b5edc4233a1873fb661ad1682",
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    xdai: {
      url: 'https://dai.poa.network',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.0"
      },
      {
        version:"0.5.8"
      },
      {
        version:"0.6.12"
      },
      {
        version:"0.7.0"
      },
      {
        version:"0.7.6"
      }],
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  etherscan: {
    apiKey: "FQKZCMUAQUA688R7FVDIH9BGD6698JIFPZ"
    //npx hardhat verify --network rinkeby 0xD2820666665C127852213554E2B1cfA8A8199Ef8 "0xa55E01a40557fAB9d87F993d8f5344f1b2408072" "0x36bede640D19981A82090519bC1626249984c908" "0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A" "0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90" "EEEE ABNAEL MACHADO DE LIMA - CENE" "[5,7,10]" "[300,500,100]" "3" "500"
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 10000000
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 20,
    enabled: false
  }
};


