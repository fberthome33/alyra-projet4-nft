// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// importing the ERC-721 contract to deploy for an artist
import "./Nft.sol";

/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. S/O @Snow
  * @dev    If the contract is already deployed for an _artistName, it will revert.
  */
contract NftFactory{

    event NftCreated(string _nftName, address _nftAddress, uint _timestamp, address _creator);

    /**
      * @notice Deploy the ERC-721 Collection contract of the artist caller to be able to create NFTs later
      *
      * @return nftAddress the address of the created collection contract
      */
    function createNft(string memory _nfName, string memory _tokenURI) external returns (address nftAddress) {
        // Import the bytecode of the contract to deploy
        bytes memory collectionBytecode = type(Nft).creationCode;
				// Make a random salt based on the artist name
        bytes32 salt = keccak256(abi.encodePacked(_nfName));

        assembly {
            nftAddress := create2(0, add(collectionBytecode, 0x20), mload(collectionBytecode), salt)
            if iszero(extcodesize(nftAddress)) {
                // revert if something gone wrong (collectionAddress doesn't contain an address)
                revert(0, 0)
            }
        }
        // Initialize the Nft contract with the artist settings
        Nft(nftAddress).mintNft(msg.sender, _tokenURI);

        emit NftCreated(_nfName, nftAddress, block.timestamp, msg.sender);
    }
}
