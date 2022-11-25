// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "contracts/RDTtoken.sol";

contract RDTnft is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    event balance(uint256);

    address public from;
    mapping(uint256 => uint256) price;
    mapping(uint256 => uint256) priceForToken;
    RDTtoken public rdt;

    function getbalance() public returns (uint256) {
        address user = msg.sender;
        emit balance(rdt.getbalance(user));
        return rdt.getbalance(user);
    }

    Counters.Counter private _tokenIdCounter;

    constructor(address addr) ERC721("ReadNft", "MTK") {
        rdt = RDTtoken(addr);
    }

    function safeMint(
        address to,
        string memory uri,
        uint256 _price,
        uint256 _priceForToken
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        price[tokenId] = _price;
        priceForToken[tokenId] = _priceForToken;
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        tokenURI(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function buyNft(address to, uint256 tokenId) external payable {
        require(price[tokenId] > 0);
        require(msg.value >= price[tokenId]);
        from = owner();
        _transfer(from, to, tokenId);
    }

    function buyNftByToken(address to, uint256 tokenId) external {
        require(priceForToken[tokenId] > 0);
        require(getbalance() >= priceForToken[tokenId]);
        getbalance() - price[tokenId];
        from = owner();
        _transfer(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    receive() external payable {}
}
