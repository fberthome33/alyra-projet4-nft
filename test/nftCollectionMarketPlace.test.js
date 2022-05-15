const NftCollectionFactory = artifacts.require("./NftCollectionFactory.sol");
const NftCollection = artifacts.require("./NftCollection.sol");
const NftMarketPlace = artifacts.require("./NftMarketPlace.sol");
const { expect } = require('chai');
const { BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

contract("NftCollectionMarketPlace", accounts => {
  const owner = accounts[0];

  describe("NftCollectionMarketPlace buy orders", () => {
    

    beforeEach(async function () {
      this.marketPlaceContract = await NftMarketPlace.new({from: owner});
      this.nftCollectionInstance = await NftCollection.new("collection", "symbol", {from: owner});
      await this.nftCollectionInstance.mintCollection("token1", {from: accounts[0]});
      await this.nftCollectionInstance.mintCollection("token2", {from: accounts[0]});
      await this.nftCollectionInstance.mintCollection("token3", {from: accounts[0]});
      await this.nftCollectionInstance.mintCollection("token4", {from: accounts[0]});

    });


    it("should create a buy order proposal", async function () {
      let contractBalance = await web3.eth.getBalance(this.marketPlaceContract.address);
      expect(new BN(contractBalance)).to.be.bignumber.equal(new BN(0));

      const orderProposal = await this.marketPlaceContract.createOrder(this.nftCollectionInstance.address, 1, {from: accounts[1], value: 10});
      const contractBalanceAccount1_amount_before =  web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether");
     



      console.log('contractBalanceAccount1_amount_before ' + contractBalanceAccount1_amount_before);
      expectEvent(orderProposal, 'CreateProposalBuyOrder', {
          nftAddress : this.nftCollectionInstance.address, 
          tokenId : new BN(1),
          count: new BN(1),
          proposer: accounts[1],
          price: new BN(10)
      });

      contractBalance = await web3.eth.getBalance(this.marketPlaceContract.address);
      expect(new BN(contractBalance)).to.be.bignumber.equal(new BN(10));

      const contractBalanceAccount1_amount_after =  web3.utils.fromWei( await web3.eth.getBalance(accounts[1]), "ether");
      console.log('contractBalanceAccount1_amount_after  ' + contractBalanceAccount1_amount_after);
      //expect(new BN(await this.nftCollectionInstance)).to.be.bignumber.equal(new BN(contractBalanceAccount1_amount_before) - new BN(100));

    });

    it("should check buy order is opened", async function () {
      let orderProposalStatus = await this.marketPlaceContract.isTradeOpen(this.nftCollectionInstance.address, 1, {from: accounts[1]});
      expect(orderProposalStatus).to.be.false;

      const orderProposal = await this.marketPlaceContract.createOrder(this.nftCollectionInstance.address, 1, {from: accounts[1], value: 100});
      expectEvent(orderProposal, 'CreateProposalBuyOrder', {
          nftAddress : this.nftCollectionInstance.address, 
          tokenId : new BN(1),
          count: new BN(1),
          proposer: accounts[1],
          price: new BN(100)
      });
      orderProposalStatus = await this.marketPlaceContract.isTradeOpen(this.nftCollectionInstance.address, 1, {from: accounts[1]});
      expect(orderProposalStatus).to.be.true;
    });

    it("NftCollection processOrder should change Nft Owner", async function () {
      const orderProposal = await this.marketPlaceContract.createOrder(this.nftCollectionInstance.address, 1, {from: accounts[1], value: 100});
      
      const proposal = await this.marketPlaceContract.getBuyProposals(this.nftCollectionInstance.address, 1, 0, {from: accounts[0]});
      console.log('proposal');
      console.log(proposal);

      const processOrderTx = await this.marketPlaceContract.processOrder(this.nftCollectionInstance.address, 1, 0, {from: accounts[0]});
      const contractBalanceAccount0_amount_before = await web3.eth.getBalance(accounts[0]);
      const contractBalanceAccount1_amount_before = await web3.eth.getBalance(accounts[1]);
      console.log('contractBalanceAccount0_amount_before' + contractBalanceAccount0_amount_before);
      console.log('contractBalanceAccount1_amount_before' + contractBalanceAccount1_amount_before);
      expectEvent(processOrderTx, 'ProcessProposalBuyOrder', {
        nftAddress: this.nftCollectionInstance.address, 
        tokenId : new BN(1),  
        index: new BN(0)
      });

      let balanceAccount0 = await this.nftCollectionInstance.balanceOf(accounts[0], {from: accounts[0]});
      expect(new BN(balanceAccount0)).to.be.bignumber.equal(new BN(3));
      
      let balanceAccount1 = await this.nftCollectionInstance.balanceOf(accounts[1], {from: accounts[0]});
      expect(new BN(balanceAccount1)).to.be.bignumber.equal(new BN(1));

      const contractBalance = await web3.eth.getBalance(this.marketPlaceContract.address);
      console.log(contractBalance);
      expect(new BN(contractBalance)).to.be.bignumber.equal(new BN(0));


      const contractBalanceAccount0_amount_after = await web3.eth.getBalance(accounts[0]);
      const contractBalanceAccount1_amount_after = await web3.eth.getBalance(accounts[1]);
      console.log('contractBalanceAccount0_amount_after' + contractBalanceAccount0_amount_after)
      console.log('contractBalanceAccount1_amount_after' + contractBalanceAccount1_amount_after)
      //expect(new BN(contractBalanceAccount0_amount_after)).to.be.bignumber.equal(new BN(contractBalanceAccount0_amount_before) + new BN(100));
    });
  });
});
