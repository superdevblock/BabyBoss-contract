// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {hre, ethers} = require("hardhat");

async function main() {
  // const AnonToken = await ethers.getContractFactory("AnonToken");
  // token = await AnonToken.deploy("ANON", "$ANON", 260000000000);
  // await token.deployed();
  // console.log("token address: ", token.address)

  // const Mecha = await ethers.getContractFactory("Mecha");
  // let mecha = await Mecha.deploy();
  // await mecha.deployed();
  // console.log("mecha address: ", mecha.address)

  const BabyBoss = await ethers.getContractFactory("BabyBoss");
  let babyBoss = await BabyBoss.deploy();
  await babyBoss.deployed();
  console.log("BabyBoss address: ", babyBoss.address)

  // const Whoiamisnotimportanttheartis = await ethers.getContractFactory("Whoiamisnotimportanttheartis");
  // wiainitai = await Whoiamisnotimportanttheartis.deploy();
  // await wiainitai.deployed();
  // console.log("wiainitai address: ", wiainitai.address)

  // const KOBA = await ethers.getContractFactory("KOBA");
  // koba = await KOBA.deploy(abstraction.address, wiainitai.address);
  // await koba.deployed();
  // console.log("koba address: ", koba.address)

  // const StakingContract = await ethers.getContractFactory("StakingContract");
  // staking = await StakingContract.deploy(
  //         token.address, 
  //         abstraction.address, ethers.utils.parseEther("25"), 
  //         wiainitai.address, ethers.utils.parseEther("5"), 
  //         koba.address, ethers.utils.parseEther("1")
  // );
  // await staking.deployed();
  // console.log("staking address: ", staking.address)

  // await koba.unPause()
  // await abstraction.setPaused()
  // await wiainitai.setPaused()

  
  // const ANON = await ethers.getContractFactory("ANON");
  // anon = await upgrades.deployProxy(ANON, [], { initializer: 'initialize' } );
  // await anon.deployed();
  // console.log("anon address: ", anon.address)
  
  // await anon.setKobaAddress('0x06c5209a0046e99e9d1BE1FE289f94C1CF91F093')

  
  // const Voting = await ethers.getContractFactory("Voting");
  // voting = await upgrades.deployProxy(Voting, [], { initializer: 'initialize' } );
  // await voting.deployed();
  // console.log("voting address: ", voting.address)

  // await voting.setAbstraction('0xA56930BC0b75BC4236468A7f0b940d2874a923C4', 5)
  // await voting.setWiainitai('0x49ecC5eBF5d4c77a54dF45f996c410A01A4D63f9', 2)
  // await voting.setAnon('0xDcFBf478FA3Af8f9BD53aCa1FB7505FcE87b7AF7', 1)

  // const proxy = '0x552ab3a362b2D7fC4255019967100E6E201134fa'
  // const Voting = await ethers.getContractFactory("Voting");
  // voting = await upgrades.upgradeProxy(proxy, Voting);
  // await voting.deployed();
  // console.log("voting address: ", voting.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
