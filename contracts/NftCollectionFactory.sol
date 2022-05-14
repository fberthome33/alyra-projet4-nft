// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// importing the ERC-721 contract to deploy for an artist
import "./NftCollection.sol";

/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. S/O @Snow
  * @dev    If the contract is already deployed for an _artistName, it will revert.
  */
contract NftCollectionFactory{

    event NftCollectionCreated(string _collectionName, address indexed _collectionAddress, uint _timestamp, address indexed _creator, string indexed _tokenURI);
    /**
      * @notice Deploy the ERC-721 Collection contract of the artist caller to be able to create NFTs later
      *
      * @return collectionAddress the address of the created collection contract
      */
    function createNFTCollection(string memory _collectionName, string memory _tokenURI) external returns (address collectionAddress) {
        // Import the bytecode of the contract to deploy
        bytes memory collectionBytecode = type(NftCollection).creationCode;
				// Make a random salt based on the artist name
        bytes32 salt = keccak256(abi.encodePacked(_collectionName));

        assembly {
            collectionAddress := create2(0, add(collectionBytecode, 0x20), mload(collectionBytecode), salt)
            if iszero(extcodesize(collectionAddress)) {
                // revert if something gone wrong (collectionAddress doesn't contain an address)
                revert(0, 0)
            }
        }
        // Initialize the collection contract with the artist settings
        NftCollection(collectionAddress).mintCollection(msg.sender, _tokenURI, _collectionName);

        emit NftCollectionCreated(_collectionName, collectionAddress, block.timestamp, msg.sender, _tokenURI);
    }
}
