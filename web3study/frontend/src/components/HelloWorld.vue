<template>
  <div class="hello">
  <div>
    <img alt="Vue logo" src="../assets/sunset.jpg" @click=connectWallet()>
  </div>
    <h1>{{ msg }}</h1>
    <button @click=mintNFT()>mintNFT</button>
  </div>
</template>

<script>
import nftABI from "../../contractsABI/RDTnft.json"
import tokenABI from "../../contractsABI/RDTtoken.json"
import { ethers } from "ethers";
import '@metamask/legacy-web3'

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
    const nft = process.env.VUE_APP_NFTCONTRACT
    const token = process.env.VUE_APP_TOKENCONTRACT
    this.nftAdr = nft
    this.tokenAdr = token
    this.currentAccount = this.checkIfWalletIsConnected();
    this.checkIfRightChain();
    this.connectContract()
  },
  methods: {
    connectContract:async function(){
      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      const signer = provider.getSigner();
      console.log(provider);
    console.log(this.currentAccount);
    console.log(this.tokenAdr);

    // if (provider) {
    const NftContract = new ethers.Contract(this.nftAdr,nftABI.abi,signer)
    const TokenContract = new ethers.Contract(this.tokenAdr,tokenABI.abi,signer)
    this.NftContract = NftContract
    this.TokenContract = TokenContract
    // From now on, this should always be true:
    // provider === window.ethereum
  //   startApp(provider); // initialize your app
  //  } else {  
  //     console.log('Please install MetaMask!');
  //  }
    },

    //check if the chain is the right chain if it's not in the right chain then change to the right chain 
    checkIfRightChain:async function(){
    try {
    await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x539' }],// my own testnet provide by ganache
});
  } catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x539',
            chainName: 'ganache',
            rpcUrls: ['https://127.0.0.1:7545'] /* ... */,
          },
        ],
      });
      await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x539' }],
})
    } catch (addError) {
      // handle "add" error
    }
  }
  // handle other "switch" errors
}
    },

    //check if the wallet is connected or not
    checkIfWalletIsConnected: async function() {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });
        
         if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          this.currentAccount = account;
          return account
        } else {
          console.log("No authorized account found");
          const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        this.currentAccount = accounts[0];
        return accounts[0]
        }
      } catch (error) {
        console.log(error);
      }
    },
    connectWallet: async function() {
      try {
        const { ethereum } = window;

        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Connected", accounts[0]);
        this.currentAccount = accounts[0];
      } catch (error) {
        console.log(error);
      }
      
      // console.log(this.nftAdr)
      // console.log(this.tokenAdr)
    },

    mintNFT:async function(){
      // var count = await this.NftContract.balanceOf('0xa1f5B3f9Fb07B79a247E16c073640DE4598F3343')
      // console.log(this.currentAccount);

      // console.log(count);
      await this.NftContract.safeMint('0xa1f5B3f9Fb07B79a247E16c073640DE4598F3343',"153","50","1")
      return console.log("sucess")
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
