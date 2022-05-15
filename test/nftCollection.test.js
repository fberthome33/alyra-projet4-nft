const NftCollectionFactory = artifacts.require("./NftCollectionFactory.sol");
const NftCollection = artifacts.require("./NftCollection.sol");
const { expect } = require('chai');
const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

contract("NftCollection", accounts => {
  const owner = accounts[0];

  it("NftCollection mint should trigger event", async () => {
    const nftCollectionInstance = await NftCollection.new("collection", "symbol", {from: owner});

    const mintCollection = await nftCollectionInstance.mintCollection("token1", {from: accounts[0]});

    const nftCollectionCreatedEvent = expectEvent(mintCollection, 'NewTokenMinted', {
      _collectionAddress: nftCollectionInstance.address,
       _tokenId : new BN(1),
       _creator: accounts[0]
    });
  });

  it("NftCollection should mint Nfts to Collection.", async () => {
    const nftCollectionInstance = await NftCollection.new("collection", "symbol", {from: owner});

    await nftCollectionInstance.mintCollection("token1", {from: accounts[0]});
    await nftCollectionInstance.mintCollection("token2", {from: accounts[0]});
    await nftCollectionInstance.mintCollection("token3", {from: accounts[0]});
    await nftCollectionInstance.mintCollection("token4", {from: accounts[0]});
    const totalSupply = await nftCollectionInstance.totalSupply({from: accounts[0]});
    expect(new BN(totalSupply)).to.be.bignumber.equal(new BN(4));

    const balanceAccount0 = await nftCollectionInstance.balanceOf(accounts[0], {from: accounts[0]});
    expect(new BN(balanceAccount0)).to.be.bignumber.equal(new BN(4));
    
    const balanceAccount1 = await nftCollectionInstance.balanceOf(accounts[1], {from: accounts[0]});
    expect(new BN(balanceAccount1)).to.be.bignumber.equal(new BN(0));
    //const nftsInCollections = await nftCollectionInstance.getOneNft(0, {from: accounts[0]});
    //expect(nftsInCollections).to.be.equal(nftInstance.address);
  });

  it("NftCollection should rever mint if caller is not the owner", async () => {
    const nftCollectionInstance = await NftCollection.new("collection", "symbol", {from: owner});
    await expectRevert(nftCollectionInstance.mintCollection("token1", {from: accounts[1]}), "Ownable: caller is not the owner");
  });
});
