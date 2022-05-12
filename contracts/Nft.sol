// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./NftCollection.sol";

contract Nft is ERC721URIStorage {

    struct NftDetail{
        bool actif;
        uint price;
        NftCollection collection;
    }

    NftDetail detail;
    string public constant baseURI = "https://gateway.pinata.cloud/ipfs";
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721 ("NFt", "NFT_FPM") {}

    function mintNft(address _owner, string memory _tokenURI) public returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        _beforeTokenTransfer(address(0), _owner, newItemId);
        return newItemId;
    }

    function tokenURI( uint256 _tokenURI) public pure override returns (string memory) {
        return string(abi.encodePacked(baseURI, _tokenURI));
    }

    function setDetail(bool actif, uint price, address collection) public {
        detail.actif = actif;
        detail.price = price;
        detail.collection = NftCollection(collection);
    }

    function setCollection(NftCollection collection) public {
        detail.collection = collection;
    }

    function getDetail() public view returns (NftDetail memory) {
        return detail;
    }
}