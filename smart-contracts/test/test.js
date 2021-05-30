const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs"); 
const BN = require('bn.js');

function mnemonic() {
  return fs.readFileSync("./test/mnemonic.txt").toString().trim();
}

describe("MNFT Test v1", function () {
  let user, admin;
  let mnft;

  it("setup localhost", async () => {
    [user, admin] = await ethers.getSigners(); //jsonrpc signers from default 20 accounts with 10000 ETH each
  })

  it("deploy all tokens", async () => {
    const MNFT = await ethers.getContractFactory(
      "multiNFT"
    );
    mnft = await MNFT.connect(admin).deploy(admin.getAddress(), "holder_uri");
    await mnft.deployed()
    })

  it("mint", async () => {
     const mtx = await mnft.connect(user).redeemMNFT("false")
     mtx.wait(1);

     const owner = await mnft.ownerOf(ethers.BigNumber.from("1337"))
     console.log("before transfer: ", owner)
  })

  it("transfer", async () => {
    const topic = -1;
    const dataHash = "0x"+(new BN(String(topic))).toTwos(256).toString('hex',64);

    //approval functions must be called from **both** chains. There isn't a clean way of making an atomic approval, and it seems unneccessary. 

    const mtx = await mnft.connect(user)['safeTransferFrom(address,address,uint256,bytes)'](user.getAddress(), admin.getAddress(), ethers.BigNumber.from("1337"), dataHash)
    mtx.wait(1);

    const owner = await mnft.ownerOf(ethers.BigNumber.from("1337"))
    console.log("after transfer: ", owner)
 })
})