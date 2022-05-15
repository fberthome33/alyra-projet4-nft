// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// importing the ERC-721 contract to deploy for a collection
import "./NftCollection.sol";

/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for a collection.
  * @dev    If the contract is already deployed for an _collectionName, it will revert.
  */
contract NftCollectionFactory{

    event NftCollectionCreated(bytes32 indexed _collectionName, address indexed _collectionAddress, uint _timestamp, address indexed _creator, string _tokenURI);

    address[] public collections;

    /**
      * @notice Deploy the ERC-721 Collection contract of the artist caller to be able to create NFTs later
      * @param _collectionName the name of the new collection
      * @param _collectionSymbol the symbol of the new collection
      * @param _tokenURI the tokenURI of the new collection
      * @return collectionAddress the address of the created collection contract
      */
    function createNFTCollection(string memory _collectionName, string memory _collectionSymbol, string memory _tokenURI) external returns (address collectionAddress) {
        // Import the bytecode of the contract to deploy
        bytes memory collectionBytecode = getCreationBytecode(_collectionName, _collectionSymbol);
				// Make a random salt based on the _collectionName
        bytes32 salt = keccak256(abi.encodePacked(_collectionName));

        assembly {
            collectionAddress := create2(0, add(collectionBytecode, 0x20), mload(collectionBytecode), salt)
            if iszero(extcodesize(collectionAddress)) {
                // revert if something gone wrong (collectionAddress doesn't contain an address)
                revert(0, 0)
            }
        }

        collections.push(collectionAddress);

        // Initialize the collection contract with the collection ist settings
        //NftCollection(collectionAddress).mintCollection(msg.sender, _tokenURI);
        NftCollection(collectionAddress).transferOwnership(msg.sender);
        bytes32 _collectionNameInBytes32 = bytes32(bytes(_collectionName));

        emit NftCollectionCreated(_collectionNameInBytes32, collectionAddress, block.timestamp, msg.sender, _tokenURI);
    }

    /**
      @dev encode parameters before call contract creation
     */
    function getCreationBytecode(string memory _collectionName, string memory _collectionSymbol) internal pure returns (bytes memory) {
      bytes memory collectionBytecode = type(NftCollection).creationCode;

      return abi.encodePacked(collectionBytecode, abi.encode(_collectionName, _collectionSymbol));
    }

    function deleteCollection(uint _index ) external {
      require(_index < collections.length, "Il n y a pas de collection pour cet index");
      NftCollection _collectionAddress = NftCollection(collections[_index]);
      _collectionAddress.destroySmartContract(payable(msg.sender));
      delete collections[_index];
    }
}
