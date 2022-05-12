const NFTCollectionFactory = artifacts.require("./NFTCollectionFactory.sol");
const NftCollection = artifacts.require("./NftCollection.sol");
const { expect } = require('chai');
const { Chance } = require('chance');
const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

contract("NFTCollectionFactory", accounts => {

  it("createNft should create one Nft.", async () => {
    const collectionFactoryInstance = await NFTCollectionFactory.deployed();
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
    expect(nftCollectionCreatedEvent.args['_collectionAddress']).to.be.equal(collectionAddress);
    expect(nftCollectionCreatedEvent.args['_timestamp']).is.not.empty;
    expect(nftCollectionCreatedEvent.args['_timestamp']).to.be.bignumber;
    expect(nftCollectionCreatedEvent.args['_creator']).to.be.equal(accounts[0]);
    web3.utils.isAddress(address)
  });

  it(" should return all Nfts for a user", async () => {
    const chance = new Chance();
    const nftCollectionInstance = await NftCollection.deployed();
    // Set value of 89
    const collectionAddress_1 = await collectionFactoryInstance.createNft("nftName", "TokenUri", { from: accounts[0] });
    const collectionAddress_2 = await collectionFactoryInstance.createNft("nftName", "TokenUri", { from: accounts[0] });

    const totalSupply = await nftCollectionInstance.totalSupply();
    console.log(totalSupply);

  });
});
