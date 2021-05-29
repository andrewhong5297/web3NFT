// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

function mnemonic() {
  try {
    return fs.readFileSync("../test/mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
    }
  }
  return "";
}

async function main() {

  provider = new ethers.providers.InfuraProvider("goerli", {
    projectId: "faefe1dcd6094fb388019173d2328d8f",
    projectSecret: "dffad28934914b97a5365fa0c2eb9de6"
  });

  shelter = ethers.Wallet.fromMnemonic(mnemonic()); //shelter mnem
  shelter = await shelter.connect(provider);
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ERC = await hre.ethers.getContractFactory("TestToken");
  const erc = await ERC.deploy();

  await erc.deployed();

  console.log("erc deployed to:", erc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
