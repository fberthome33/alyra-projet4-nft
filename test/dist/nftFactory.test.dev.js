"use strict";

var NftFactory = artifacts.require("./NftFactory.sol");

var Nft = artifacts.require("./Nft.sol");

var _require = require('chai'),
    expect = _require.expect;

var _require2 = require('chance'),
    Chance = _require2.Chance;

var _require3 = require('@openzeppelin/test-helpers'),
    BN = _require3.BN,
    expectEvent = _require3.expectEvent,
    expectRevert = _require3.expectRevert;

var fs = require('fs');

contract("NftFactory", function (accounts) {
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
  it(" should return all Nfts for a user", function _callee() {
    var chance, nftFactoryInstance, nftAddress_1, nftCreatedEvent_1, nftAddress_2, nftCreatedEvent_2, contract, instance, totalSupply, tokenId_0, tokenId_1;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            chance = new Chance();
            _context.next = 3;
            return regeneratorRuntime.awrap(NftFactory.deployed());

          case 3:
            nftFactoryInstance = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(nftFactoryInstance.createNft("nftName_1", "TokenUri1", {
              from: accounts[0]
            }));

          case 6:
            nftAddress_1 = _context.sent;
            nftCreatedEvent_1 = expectEvent(nftAddress_1, 'NftCreated');
            console.log(nftCreatedEvent_1.args['_nftAddress']);
            _context.next = 11;
            return regeneratorRuntime.awrap(nftFactoryInstance.createNft("nftName_2", "TokenUri2", {
              from: accounts[0]
            }));

          case 11:
            nftAddress_2 = _context.sent;
            nftCreatedEvent_2 = expectEvent(nftAddress_1, 'NftCreated');
            console.log(nftCreatedEvent_2.args['_nftAddress']);
            contract = JSON.parse(fs.readFileSync('./client/src/contracts/Nft.json', 'utf8'));
            instance = new web3.eth.Contract(contract.abi, nftCreatedEvent_1.args['_nftAddress']);
            _context.next = 18;
            return regeneratorRuntime.awrap(instance.methods.totalSupply().call());

          case 18:
            totalSupply = _context.sent;
            expect(totalSupply).to.be.bignumber.equal(new BN(2));
            _context.next = 22;
            return regeneratorRuntime.awrap(instance.methods.tokenOfOwnerByIndex(accounts[0], 0).call());

          case 22:
            tokenId_0 = _context.sent;
            console.log(tokenId_0);
            _context.next = 26;
            return regeneratorRuntime.awrap(instance.methods.tokenOfOwnerByIndex(accounts[0], 1).call());

          case 26:
            tokenId_1 = _context.sent;
            console.log(tokenId_1);
            expect(tokenId_0).to.be.equal('TokenUri1');
            expect(tokenId_1).to.be.equal('TokenUri2');

          case 30:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});