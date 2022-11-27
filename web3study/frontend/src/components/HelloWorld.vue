<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png" @click=connectWallet()>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      currentAccount: null,
      nftAdr:null,
      tokenAdr:null
    };
  },
  mounted() {
    const nft = process.env.VUE_APP_NFTCONTRACT
    const token = process.env.VUE_APP_TOKENCONTRACT
    this.nftAdr = nft
    this.tokenAdr = token
    this.checkIfWalletIsConnected();
   
  },
  methods: {
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
        } else {
          console.log("No authorized account found");
          const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        this.currentAccount = accounts[0];
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
      console.log(this.nftAdr)
      console.log(this.tokenAdr)
    },
    
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
