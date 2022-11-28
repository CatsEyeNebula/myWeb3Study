require('dotenv').config({ path: '../.env'});
const { BigNumber } = require('ethers');
const { network, web3 } = require('hardhat');
const hre = require("hardhat");//提供ether.js
const nftcontract = require("../artifacts/contracts/RDTnft.sol/RDTnft.json");//nft abi json
const tokencontract = require("../artifacts/contracts/RDTtoken.sol/RDTtoken.json");// token abi json


const {PRIVATE_KEY2,NFTCONTRACT,TOKENCONTRACT,MYADDRESS} = process.env;

//provider
    const provider = new hre.ethers.providers.Web3Provider(web3.currentProvider);//ganache作为provider 检测当前网络环境为ganache
//signer - you
    const signer = new hre.ethers.Wallet(PRIVATE_KEY2,provider)

//contract instance
    const nft = new hre.ethers.Contract(NFTCONTRACT,nftcontract.abi,signer)
    const token = new hre.ethers.Contract(TOKENCONTRACT,tokencontract.abi,signer)

    async function mint(){
        const i = 10;
        await nft.safeMint(MYADDRESS,"22","52","52");
        var count = await nft.balanceOf(MYADDRESS)
        console.log(count)
        }
    
    
    async function main(){
        for(var i =0;i<5;i++){
            await  mint();//必须等待一个mint完 所以await
        }
    }

    main();//调用循环mint

   
    
    
    