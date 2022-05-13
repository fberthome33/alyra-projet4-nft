const NftCollectionFactory = artifacts.require("./NftCollectionFactory.sol");
const NftCollection = artifacts.require("./NftCollection.sol");
const NftFactory = artifacts.require("./NftFactory.sol");
const Nft = artifacts.require("./Nft.sol");
const { expect } = require('chai');
const { Chance } = require('chance');
const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

contract("NftCollectionFactory", accounts => {

  it("createNft should create one Nft Collection.", async () => {
    const collectionFactoryInstance = await NftCollectionFactory.deployed();
    const chance = new Chance();
    

    // Set value of 89
    const collectionAddress = await collectionFactoryInstance.createNFTCollection("collectionName", "TokenUri", { from: accounts[0] });
    console.log(collectionAddress)
    console.log('collectionAddress')
    expect(collectionAddress).not.empty;

    const nftCollectionCreatedEvent = expectEvent(collectionAddress, 'NftCollectionCreated', {
      _collectionName: "collectionName"
    });
    console.log('nftCollectionCreatedEvent');
    console.log(nftCollectionCreatedEvent);
    expect(nftCollectionCreatedEvent.args['_collectionAddress']).is.not.empty;
    expect(nftCollectionCreatedEvent.args['_timestamp']).is.not.empty;
    expect(nftCollectionCreatedEvent.args['_timestamp']).to.be.bignumber;
    expect(nftCollectionCreatedEvent.args['_creator']).to.be.equal(accounts[0]);
    web3.utils.isAddress(nftCollectionCreatedEvent.args['_collectionAddress'])
  });
});
