const NftFactory = artifacts.require("./NftFactory.sol");
const Nft = artifacts.require("./Nft.sol");
const { expect } = require('chai');
const { Chance } = require('chance');
const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');
const fs = require('fs');

contract("NftFactory", accounts => {
  /*it("createNft should create one Nft.", async () => {
    const chance = new Chance();
    const nftFactoryInstance = await NftFactory.deployed();

    // Set value of 89
    const nftAddress = await nftFactoryInstance.createNft("nftName", "TokenUri", { from: accounts[0] });
    expect(nftAddress).not.empty;

    const nftCreatedEvent = expectEvent(nftAddress, 'NftCreated', {
      _nftName: "nftName"
    });
    //expect(nftCreatedEvent.args['_nftAddress']).to.be.equal(nftAddress);
    expect(nftCreatedEvent.args['_timestamp']).is.not.empty;
    expect(nftCreatedEvent.args['_timestamp']).to.be.bignumber;
    expect(nftCreatedEvent.args['_creator']).to.be.equal(accounts[0]);
    web3.utils.isAddress(nftAddress)
  });*/

  it(" should return all Nfts for a user", async () => {
    const chance = new Chance();
    const nftFactoryInstance = await NftFactory.deployed();

    // Set value of 89
    const nftAddress_1 = await nftFactoryInstance.createNft("nftName_1", "TokenUri1", { from: accounts[0] });
    const nftCreatedEvent_1 = expectEvent(nftAddress_1, 'NftCreated');
    console.log(nftCreatedEvent_1.args['_nftAddress']);
    const nftAddress_2 = await nftFactoryInstance.createNft("nftName_2", "TokenUri2", { from: accounts[0] });
    const nftCreatedEvent_2 = expectEvent(nftAddress_2, 'NftCreated');
    console.log(nftCreatedEvent_2.args['_nftAddress']);
    
    const contract = JSON.parse(fs.readFileSync('./client/src/contracts/Nft.json', 'utf8'));
    
    const instance = new web3.eth.Contract(
      contract.abi,
      nftCreatedEvent_1.args['_nftAddress'],
    );
    /*const totalSupply = await instance.methods.totalSupply().call();
    expect(totalSupply).to.be.bignumber.equal(new BN(2));
*/

    /*const tokenId_1 = await instance.methods.tokenByIndex(1).call();
    console.log(tokenId_1);

    const tokenId_0 = await instance.methods.tokenByIndex(0).call();
    console.log(tokenId_0);
*/
  });
});
