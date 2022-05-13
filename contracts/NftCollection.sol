// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Nft.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftCollection is ERC721Enumerable, ERC721URIStorage, Ownable {
    event NftAddedToCollection(address _collectionAddress, address _nftAddress, address _creator);


    string public constant baseURI = "https://gateway.pinata.cloud/ipfs";
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721 ("NFt", "NFT_FPM") {}

    Nft[] nftsInCollections;

    function mintCollection(address _owner, string memory _tokenURI) public returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(_owner, newItemId);
        _setTokenURI(newItemId, _tokenURI);
 
        return newItemId;
    }

    function tokenURI( uint256 _tokenURI) public pure override(ERC721URIStorage, ERC721) returns (string memory) {
        return string(abi.encodePacked(baseURI, _tokenURI));
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


    function addNft(Nft nft) external onlyOwner{
        nft.setCollection(this);
        nftsInCollections.push(nft);
        super._beforeTokenTransfer(address(0), address(this), _tokenIds.current());
        emit NftAddedToCollection(address(this), address(nft), msg.sender);
    }

    function removeNft(Nft nft) external onlyOwner{
        for (uint i = 0 ; i < nftsInCollections.length; i++) {
            if(nftsInCollections[i] == nft) {
                delete nftsInCollections[i];
                break;
            }
        }
    }

    /** 
        getOneNft method
        @param _nftId index of a nft
        @return the nft specified by an _nftId index
    */
    function getOneNft(uint _nftId) external view returns (Nft) {
        return nftsInCollections[_nftId];
    }
}
