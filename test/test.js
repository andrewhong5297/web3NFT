const { expect } = require("chai");
const { ethers } = require("hardhat");
const { abi: abiDisk } = require("../artifacts/contracts/tokens/Disk.sol/Disk.json");
const { abi: abiProblem } = require("../artifacts/contracts/ProblemNFT.sol/ProblemNFT.json");
const fs = require("fs"); 
const BN = require('bn.js');

describe("Diskover Full Test v1", function () {
  let problemNFT, startProblem, usdc;
  let disk, regtoken, probtoken, conttoken, registry;
  let problemHash, expiry;
  let writer1, writer2, reader, admin;
  let contentHash, contentHash2;
  let dao, adminDao, leader1, leader2, editor1;

  it("setup localhost", async () => {
    [writer1, writer2, reader, admin, adminDao, leader1, leader2, editor1] = await ethers.getSigners(); //jsonrpc signers from default 20 accounts with 10000 ETH each
  })

  it("deploy all tokens", async () => {
    const Disk = await ethers.getContractFactory(
      "Disk"
    );
    disk = await Disk.connect(admin).deploy(); //mints full supply to deployer
    await disk.deployed()

    const RegToken = await ethers.getContractFactory(
      "RegToken"
    );
    regtoken = await RegToken.connect(admin).deploy(); //mints full supply to deployer
    await regtoken.deployed()
      
    const ProbToken = await ethers.getContractFactory(
      "ProbToken"
    );
    probtoken = await ProbToken.connect(admin).deploy(); //mints full supply to deployer
    await probtoken.deployed()

    const ContToken = await ethers.getContractFactory(
      "ContToken"
    );
    conttoken = await ContToken.connect(admin).deploy(); //mints full supply to deployer
    await conttoken.deployed()
    })
})