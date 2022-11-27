 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/RDTnft.sol";


contract RDTtoken is ERC20, Ownable {

    mapping (address => uint256) public userReadTime;

    event mintEvent(address to, uint256 amount);
    event autoMintEvent(address to, uint256 amount);
                                                                                                                            
    constructor() ERC20("RdtToken", "RDT") {}

    //此修饰器获取读者阅读时间与读者地址
    modifier getReadtime(address to){
        require(userReadTime[to] > 60);
        require(to != address(0));
        _;
    }


    //管理员自己手动发放代币
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0));
        _mint(to, amount);
        emit mintEvent(to,amount);
    }

    //自动检测读者阅读时间足够获取代币，足够则发放代币
    //amount在前端检测时间后传给这个函数
     function autoMint(address to, uint256 amount,uint _readtime) external getReadtime(to){
         userReadTime[to] += _readtime;
        _mint(to, amount);
        emit autoMintEvent(to,amount);
    }
    function getbalance(address who) payable  external returns(uint256){
        return balanceOf(who);
    }
    
}
 
 