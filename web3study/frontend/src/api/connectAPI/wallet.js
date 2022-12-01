import { ethers } from "ethers";
import nftABI from "../../../contractsABI/RDTnft.json"
import tokenABI from "../../../contractsABI/RDTtoken.json"


export default{
       connectContract(nftAdr,tokenAdr) {
            const provider = new ethers.providers.Web3Provider(web3.currentProvider);
            const signer =  provider.getSigner();
            var NftContract = new ethers.Contract(nftAdr,nftABI.abi,signer)
            var TokenContract = new ethers.Contract(tokenAdr,tokenABI.abi,signer)
            return {NftContract,TokenContract}
    },

    async checkIfRightChain(){
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
                    rpcUrls: ['https://127.0.0.1:7545'] /* provide by ganache */,
                  },
                ],
              });
              await ethereum.request({
              method: 'wallet_switchEthereumChain', //switch chain
              params: [{ chainId: '0x539' }],
        })
            } catch (addError) {
              // handle "add" error
            }
          }
          // handle other "switch" errors
        }
    },

    async checkIfWalletIsConnected(){
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
    
    async connectWallet(){
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
    }
}