// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// importing the ERC-721 contract to deploy for a collection
import "./NftCollection.sol";


/** 
  * @notice Give the ability to create buy order for an nft and process them
  */
contract NftTrade {

    // Mapping from collection to buyProposal token IDs
    mapping(NftCollection => mapping(uint256 => BuyProposals)) private nftTrades;
    
    event CreateProposalBuyOrder(address _nftAddress, uint _tokenId, uint count);
    event ProcessProposalBuyOrder(address _nftAddress, uint _tokenId, uint index);
    enum  BuyProposalStatus {
        Open,
        Executed,
        Cancelled
    }

    struct BuyProposals {
        BuyProposalStatus status; // Open, Executed, Cancelled
        BuyProposal[] buyProposals;
    }

    struct BuyProposal {
        address proposalOwner;
        uint256 price;   
    }


    /** 
        createOrder method
        @notice transfer price to contract
        @param _nftCollection the addres of nftCollection
        @param _price the offered price
        @dev Throws if _nft does not exists
    */    
    function createOrder(NftCollection _nftCollection, uint256 _tokenId, uint _price) external payable {
        require(nftTrades[_nftCollection][_tokenId].status == BuyProposalStatus.Open, "no proposals for this Nft");
        payable(address(this)).transfer(_price);
        BuyProposals memory proposals;
        proposals.status = BuyProposalStatus.Open;

        BuyProposal memory buyProposal;
        buyProposal.proposalOwner = msg.sender;
        buyProposal.price = _price;

        nftTrades[_nftCollection][_tokenId].buyProposals.push(buyProposal);
        
        emit CreateProposalBuyOrder(address(_nftCollection), _tokenId, nftTrades[_nftCollection][_tokenId].buyProposals.length);
    }

    function processOrder(NftCollection _nftCollection, uint256 _tokenId, uint proposalIndex ) external {
        require(msg.sender == _nftCollection.ownerOf(_tokenId), "You are not the tokenId owner");

        require(proposalIndex < nftTrades[_nftCollection][_tokenId].buyProposals.length, "this proposal for this index does not exists");
        require(nftTrades[_nftCollection][_tokenId].status == BuyProposalStatus.Open, "no proposals for this Nft");
        nftTrades[_nftCollection][_tokenId].status = BuyProposalStatus.Executed;

        BuyProposal storage buyProposal = nftTrades[_nftCollection][_tokenId].buyProposals[proposalIndex];
        _nftCollection.changeNftOwner(buyProposal.proposalOwner, _tokenId);
        
        payable(address(_nftCollection.ownerOf(_tokenId))).transfer(buyProposal.price);

        for (uint index = 0; index < nftTrades[_nftCollection][_tokenId].buyProposals.length; index++ ) {
            if(index != proposalIndex) {
                BuyProposal storage notAcceptedProposal = nftTrades[_nftCollection][_tokenId].buyProposals[proposalIndex];
                payable(address(notAcceptedProposal.proposalOwner)).transfer(notAcceptedProposal.price);
            }
        }
 
        emit ProcessProposalBuyOrder(address(_nftCollection), _tokenId, proposalIndex);
    }

    function cancelOrders(NftCollection _nftCollection, uint256 _tokenId) external {
        require(nftTrades[_nftCollection][_tokenId].status == BuyProposalStatus.Open, "no proposals for this Nft");
        nftTrades[_nftCollection][_tokenId].status = BuyProposalStatus.Cancelled;
    }
}