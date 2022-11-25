require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-web3");
require('dotenv').config({ path: './.env'});//踩巨坑


/** @type import('hardhat/config').HardhatUserConfig */


const {API_URL,PRIVATE_KEY,PRIVATE_KEY2} = process.env;


module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"ganache",
  allowUnlimitedContractSize: true,
  networks:{
    ganache:{
      url:"http://127.0.0.1:7545",
      accounts: [`0x${PRIVATE_KEY2}`]
    },
    hardhat:{
    },
    //用npx hardhat run scripts/deploy.js --network goerli来部署到goerli链上
    goerli:{
      //api key for alchemy
      url:API_URL,
      //wallet password
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
  //自定义命令行
  task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
