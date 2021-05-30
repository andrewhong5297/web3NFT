// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { ethers } = require("hardhat");
const fs = require("fs"); 


function mnemonic() {
    return fs.readFileSync("./test/mnemonic.txt").toString().trim();
}

async function main() {

  provider = new ethers.providers.InfuraProvider("rinkeby", {
    projectId: "60be357b5edc4233a1873fb661ad1682",
    projectSecret: "75697b5194ea4f5d8fc49b80ff5cd7bd"
  });

  let user = ethers.Wallet.fromMnemonic(mnemonic()); //shelter mnem
  user = await user.connect(provider);

  console.log(await user.getAddress())

  const balance = await user.getBalance();
  console.log(balance.toString())

  const ERC = await ethers.getContractFactory("TestToken");
  const erc = await ERC.connect(user).deploy();

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
