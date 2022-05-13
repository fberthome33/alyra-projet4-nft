const NftCollectionFactory = artifacts.require("./NftCollectionFactory.sol");
const NftCollection = artifacts.require("./NftCollection.sol");
const NftFactory = artifacts.require("./NftFactory.sol");
const Nft = artifacts.require("./Nft.sol");
const { expect } = require('chai');
const { Chance } = require('chance');
const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

contract("NftCollection", accounts => {
  const owner = accounts[0];
  it("createNft should add one Nft to Collection.", async () => {
    const nftCollectionInstance = await NftCollection.new({from: owner});
    const nftInstance = await Nft.new({from: owner});
    const addNftCall = await nftCollectionInstance.addNft(nftInstance.address, {from: owner});
    const nftsInCollections = await nftCollectionInstance.getOneNft(0, {from: owner});
    expect(nftsInCollections).to.be.equal(nftInstance.address);

    expectEvent(addNftCall, 'NftAddedToCollection', {
      _collectionAddress: nftCollectionInstance.address,
      _nftAddress: nftInstance.address,
      _creator: accounts[0]
    });
  })
});
