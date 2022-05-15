const NftCollectionFactory = artifacts.require("./NftCollectionFactory.sol");
const NftCollection = artifacts.require("./NftCollection.sol");
const { expect } = require('chai');
const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');
const fs = require('fs');

const bytes64name = (name) => {
  let kck256 = web3.utils.asciiToHex(name);
  return web3.utils.padRight(kck256, 64);
}

contract("NftCollectionFactory", accounts => {

  it("should create a new Collection", async () => {
    const collectionFactoryInstance = await NftCollectionFactory.deployed();
    const collectionAddress = await collectionFactoryInstance.createNFTCollection("collectionName", "collectionSymbol", "TokenUri", { from: accounts[0] });
 
    expect(collectionAddress).not.empty;
    expect(nftCollectionCreatedEvent.args['_collectionAddress']).is.not.empty;
    expect(nftCollectionCreatedEvent.args['_timestamp']).is.not.empty;
    expect(nftCollectionCreatedEvent.args['_timestamp']).to.be.bignumber;
    expect(nftCollectionCreatedEvent.args['_creator']).to.be.equal(accounts[0]);
    web3.utils.isAddress(nftCollectionCreatedEvent.args['_collectionAddress'])
  });
  

  it("should retreave a new created Collection", async () => {
    const collectionFactoryInstance = await NftCollectionFactory.deployed();

    const createNFTCollection = await collectionFactoryInstance.createNFTCollection("collectionName_2", "collectionSymbol_2", "TokenUri", { from: accounts[0] });
    const nftCollectionCreatedEvent = expectEvent(createNFTCollection, 'NftCollectionCreated');
    const newCollectionAddress = nftCollectionCreatedEvent.args['_collectionAddress']

    const contract = JSON.parse(fs.readFileSync('./client/src/contracts/NftCollection.json', 'utf8'));
    
    const instance = new web3.eth.Contract(contract.abi, newCollectionAddress);
    const nftOwner = await instance.methods.owner().call({from: accounts[0]});
    expect(nftOwner).to.be.equal(accounts[0]);
  });

});
