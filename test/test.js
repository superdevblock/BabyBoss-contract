const { ethers, upgrades } = require("hardhat");
const {expect} = require('chai')
// const {uniqueString} = require('unique-string');
// const { time } = require('openzeppelin-test-helpers');
const keccak256 = require('keccak256');
const assert = require('assert').strict;
const provider = waffle.provider;

require("@nomiclabs/hardhat-ethers");

describe("Test Token", async function () {
    let owner, accounts;
    let teamWallet;
    let staking, token, presale, busd, marketplace, wbnb, anon;
    before(async () => {
        [owner, ...accounts] = await ethers.getSigners();

        
        const AnonToken = await ethers.getContractFactory("AnonToken");
        token = await AnonToken.deploy("ANON", "$ANON", 260000000000);
        await token.deployed();
        console.log("token address: ", token.address)

        const Abstractionbyanon = await ethers.getContractFactory("Abstractionbyanon");
        abstraction = await Abstractionbyanon.deploy();
        await abstraction.deployed();
        console.log("abstraction address: ", abstraction.address)

        const Whoiamisnotimportanttheartis = await ethers.getContractFactory("Whoiamisnotimportanttheartis");
        wiainitai = await Whoiamisnotimportanttheartis.deploy();
        await wiainitai.deployed();
        console.log("wiainitai address: ", wiainitai.address)

        const KOBA = await ethers.getContractFactory("KOBA");
        koba = await KOBA.deploy(abstraction.address, wiainitai.address);
        await koba.deployed();
        console.log("koba address: ", koba.address)

        // const ANON = await ethers.getContractFactory("ANON");
        // anon = await upgrades.deployProxy(ANON, [], { initializer: 'initialize' } );
        // await anon.deployed();
        // console.log("anon address: ", anon.address)
        
        const ANON = await ethers.getContractFactory("ANON");
        anon = await ANON.deploy(koba.address);
        await anon.deployed();
        console.log("anon address: ", anon.address)

        // const StakingContract = await ethers.getContractFactory("StakingContract");
        // staking = await upgrades.deployProxy(StakingContract, [], { initializer: 'initialize' } );
        // await staking.deployed()
        // console.log("staking address: ", staking.address)
        
        const StakingContract = await ethers.getContractFactory("StakingContract");
        staking = await StakingContract.deploy(token.address)
        await staking.deployed()
        console.log("staking address: ", staking.address)

        // const KOBA = await ethers.getContractFactory("KOBA");
        // koba = await upgrades.deployProxy(KOBA, [abstraction.address, wiainitai.address], { initializer: 'initialize' } );
        // await koba.deployed();
        // console.log("koba address: ", koba.address)

        // const StakingContract = await ethers.getContractFactory("StakingContract");
        // staking = await upgrades.deployProxy(StakingContract, [
        //         token.address, 
        //         abstraction.address, ethers.utils.parseEther("25"), 
        //         wiainitai.address, ethers.utils.parseEther("5"), 
        //         wiainitai.address, ethers.utils.parseEther("1")
        //     ], { initializer: 'initialize' } );
        // await staking.deployed();
        // console.log("staking address: ", staking.address)

        
        const Voting = await ethers.getContractFactory("Voting");
        voting = await upgrades.deployProxy(Voting, [], { initializer: 'initialize' } );
        await voting.deployed();
        console.log("voting address: ", voting.address)

        await voting.setAbstraction(abstraction.address, 5)
        await voting.setWiainitai(wiainitai.address, 2)
        await voting.setAnon(anon.address, 1)

        await abstraction.setPaused()
        await wiainitai.setPaused()
        await koba.unPause()
        await anon.setPaused()
        await anon.setKobaAddress(koba.address)

        await staking.setRewardTokenAddress(token.address)
        await staking.allowCollectionToStake(abstraction.address, true)
        await staking.allowCollectionToStake(wiainitai.address, true)

        await staking.setRewardTokenPerBlock(abstraction.address, ethers.utils.parseEther("0.05"))
        await staking.setRewardTokenPerBlock(wiainitai.address, ethers.utils.parseEther("0.01"))
    });
    
    it("mint abstraction and wiainitai features", async function () {
        console.log("***********************  mint ************************")
        await abstraction.connect(accounts[0]).mint(1, {value: 0});
        await abstraction.connect(accounts[1]).mint(1, {value: 0});

        await abstraction.connect(accounts[2]).mint(1, {value: 0});
        await abstraction.connect(accounts[2]).transferFrom(accounts[2].address, accounts[0].address, 2)

        await abstraction.connect(accounts[3]).mint(1, {value: 0});
        await abstraction.connect(accounts[3]).transferFrom(accounts[3].address, accounts[0].address, 3)

        await wiainitai.connect(accounts[0]).mint({value: 0});
        await wiainitai.connect(accounts[1]).mint({value: 0});

        await wiainitai.connect(accounts[2]).mint({value: 0});
        await wiainitai.connect(accounts[2]).transferFrom(accounts[2].address, accounts[0].address, 2)

        console.log("account 0 abstraction balance: ", (await abstraction.balanceOf(accounts[0].address)).toString())
        // console.log("account 1 abstraction balance: ", (await abstraction.balanceOf(accounts[1].address)).toString())
    });

    
    it("mint & claim koba features", async function () {
        console.log("account 0 koba balance: ", (await koba.balanceOf(accounts[0].address)).toString())
        await koba.connect(accounts[0]).claimForAbstraction()
        console.log("account 0 koba balance: ", (await koba.balanceOf(accounts[0].address)).toString())
        await koba.connect(accounts[0]).claimForWiainitai()
        console.log("account 0 koba balance: ", (await koba.balanceOf(accounts[0].address)).toString())
        await koba.connect(accounts[0]).publicSale(3, {value: ethers.utils.parseEther((0.09 * 3).toString())});
        console.log("account 0 koba balance: ", (await koba.balanceOf(accounts[0].address)).toString())

        
        await koba.connect(accounts[5]).publicSale(3, {value: ethers.utils.parseEther((0.09 * 3).toString())});
        await koba.airdrop([accounts[0].address, accounts[1].address, accounts[2].address])

        console.log("***********************  anon ************************")
        await koba.connect(accounts[0]).setApprovalForAll(anon.address, true)

        // await koba.connect(accounts[0]).transferFrom(accounts[0].address, anon.address, 0)
        console.log("account 0 koba balance: ", (await koba.balanceOf(accounts[0].address)).toString())
        await anon.connect(accounts[0]).manualRevealKoba([0])
        console.log("Burn Address Balance: ", (await koba.balanceOf(anon.address)).toString())
        console.log("account 0 anon balance: ", (await anon.balanceOf(accounts[0].address)).toString())
        console.log("account 0 koba balance: ", (await koba.balanceOf(accounts[0].address)).toString())
    });

    
    it("staking features", async function () {
        console.log("********************* staking individual collection **************************")
        await token.transfer(staking.address, ethers.utils.parseEther("1000000000"))
        await abstraction.connect(accounts[0]).setApprovalForAll(staking.address, true)
        await wiainitai.connect(accounts[0]).setApprovalForAll(staking.address, true)


        await staking.connect(accounts[0]).stake(abstraction.address, [0, 2])
        
        await network.provider.send("evm_increaseTime", [86400 * 1])
        await network.provider.send("evm_mine")


        console.log("account 0 staking info: ", await staking.getStakingInfo(abstraction.address, accounts[0].address))

        // await staking.connect(accounts[0]).unstake(abstraction.address, [0, 2])
        await staking.connect(accounts[0]).claimRewards(abstraction.address)
        // console.log("account 0 reward amount: ", ethers.utils.formatEther(await token.balanceOf(accounts[0].address)))
        // console.log("account 0 abstraction amount: ", await abstraction.balanceOf(accounts[0].address))

        console.log("account 0 staking info: ", await staking.getStakingInfo(abstraction.address, accounts[0].address))

        await network.provider.send("evm_increaseTime", [86400 * 2])
        await network.provider.send("evm_mine")

        await staking.connect(accounts[0]).unStake(abstraction.address, [0, 2])
        console.log("account 0 staking info: ", await staking.getStakingInfo(abstraction.address, accounts[0].address))

        console.log("********************* voting feature **************************")
        console.log("abstraction balance account 0: ", await abstraction.balanceOf(accounts[0].address))

        const blockNumBefore = await ethers.provider.getBlockNumber();
        const blockBefore = await ethers.provider.getBlock(blockNumBefore);
        const timestampBefore = blockBefore.timestamp + 86400;

        console.log("now: ", timestampBefore)
        await voting.connect(accounts[0]).makeProposal("first proposal", timestampBefore, timestampBefore + 86400)

        
        await network.provider.send("evm_increaseTime", [86400 + 10])
        await network.provider.send("evm_mine")


        await voting.connect(accounts[1]).vote(0, true)
    });    

    
    // it("staking features", async function () {
    //     console.log("********************* staking multi collection **************************")
        
    //     await staking.connect(accounts[0]).stakeAll([abstraction.address, wiainitai.address], [[0, 2], [0, 2]])
    //     console.log("account 0 staking info: ", await staking.getStakingInfo(wiainitai.address, accounts[0].address))
    //     await network.provider.send("evm_increaseTime", [86400 * 2])
    //     await network.provider.send("evm_mine")

    //     await staking.connect(accounts[0]).unStake(wiainitai.address, [0])
    //     console.log("account 0 staking info: ", await staking.getStakingInfo(wiainitai.address, accounts[0].address))
    //     // await staking.connect(accounts[0]).unStakeAll([abstraction.address, ], [0])
    // });
});