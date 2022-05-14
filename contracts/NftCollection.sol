// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftCollection is ERC721Enumerable, ERC721URIStorage, Ownable {
    event NewTokenMinted(address indexed _collectionAddress, uint256 indexed _tokenId, address indexed _creator);

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    struct NftDetail{
        bool actif;
        uint price;
        string nftName;
    }
    NftDetail[] public nftDetails;


    constructor(string memory _collectionName, string memory _collectionSymbol) ERC721 (_collectionName, _collectionSymbol) {}

    function mintCollection(address _owner, string memory _tokenURI) public returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        _beforeTokenTransfer(address(0), msg.sender, newItemId);
        emit NewTokenMinted(address(this), newItemId, msg.sender);

        NftDetail memory detail;
        detail.actif = true;
        detail.price= 0;

        nftDetails.push(detail);
        return newItemId;
    }

    function tokenURI( uint256 _tokenURI) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return string(abi.encodePacked(_baseURI(), _tokenURI));
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721Enumerable, ERC721) {

        super._beforeTokenTransfer(from, to, tokenId);
    }
    

    function _burn(uint256 tokenId) internal virtual override(ERC721URIStorage, ERC721) {
      super._burn(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);

    }

    function removeNft(uint256 _tokenId) external {
        _burn(_tokenId);
        delete nftDetails[_tokenId];
    }

    function changeNftOwner(address _newOwnerAddress, uint256 _tokenId) external {
        _beforeTokenTransfer(msg.sender, _newOwnerAddress, _tokenId);
    }

    function destroySmartContract(address payable _to) public onlyOwner {
        require(totalSupply() == 0, "collection needs to be embpty before deletion");
        selfdestruct(_to);
    }
    
    /** 
        getOneNft method
        @param _index index of a nft
        @return the nft specified by an _nftId index
    */
    function getOneNft(uint _index) external view returns (NftDetail memory) {
        return nftDetails[_index];
    }

    function setDetail(uint256 _index, bool actif, uint price, string memory nftName) external  {
        NftDetail memory detail;
        detail.actif = actif;
        detail.price = price;
        detail.nftName = nftName;
        nftDetails[_index] = detail;
    }
}
