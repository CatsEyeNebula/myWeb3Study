<template>
  <div class="hello">
  <div>
    <img alt="Vue logo" src="../assets/sunset.jpg" @click=connectWallet()>
  </div>
    <h1>{{ msg }}</h1>
    <button @click=mintNFT()>mintNFT</button>
    <button @click=getBalance()>getBalance</button>
  </div>
</template>

<script>
import nftABI from "../../contractsABI/RDTnft.json"
import tokenABI from "../../contractsABI/RDTtoken.json"
import { ethers } from "ethers";
import wallet from '../api/connectAPI/wallet'
import '@metamask/legacy-web3' //old version of metamask's provider

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      currentAccount:null,
      nftAdr:null,
      tokenAdr:null,
      NftContract:null,
      TokenContract:null
    };
  },
  mounted() {
    this.nftAdr = process.env.VUE_APP_NFTCONTRACT
    this.tokenAdr = process.env.VUE_APP_TOKENCONTRACT
    this.currentAccount = this.checkIfWalletIsConnected();
    this.checkIfRightChain();
    this.connectContract()
  },
  methods: {
    connectContract(){
       let address =  wallet.connectContract(this.nftAdr,this.tokenAdr)
       this.NftContract = address.NftContract
       this.okenContract = address.TokenContract
    },
   

    //check if the chain is the right chain if it's not in the right chain then change to the right chain 
     async checkIfRightChain(){
     await wallet.checkIfRightChain()
    },

    //check if the wallet is connected or not
    async checkIfWalletIsConnected(){
      await wallet.checkIfWalletIsConnected()
    },

    //click to connect wallet
    async connectWallet() {
      await wallet.connectWallet()
    },

    mintNFT:async function(){
      // var count = await this.NftContract.balanceOf('0xa1f5B3f9Fb07B79a247E16c073640DE4598F3343')
      // console.log(this.currentAccount);
      // console.log(count);
      await this.NftContract.safeMint('0xa1f5B3f9Fb07B79a247E16c073640DE4598F3343',"153","50","1")
      return  console.log("sucess")
    },

    getBalance:async function(){
      var count = await this.NftContract.balanceOf('0xa1f5B3f9Fb07B79a247E16c073640DE4598F3343')
      console.log(this.currentAccount);
      console.log(count);
    }
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
