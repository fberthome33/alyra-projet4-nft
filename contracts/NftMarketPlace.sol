// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

// importing the ERC-721 contract to deploy for a collection
import "./NftCollection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/** 
  * @notice Give the ability to create buy order for an nft and process them
  */
contract NftMarketPlace is Ownable {

    // Mapping from collection to buyProposal token IDs
    mapping(NftCollection => mapping(uint256 => BuyProposals)) private nftTrades;
    
    event CreateProposalBuyOrder(address nftAddress, uint tokenId, uint count, address proposer, uint price);
    event ProcessProposalBuyOrder(address nftAddress, uint tokenId, uint index);
    enum  BuyProposalStatus {
        NotCreated,
        Open,
        Executed,
        Cancelled
    }

    struct BuyProposals {
        BuyProposalStatus status; // Open, Executed, Cancelled
        BuyProposal[] buyProposals;
    }

    struct BuyProposal {
        address payable proposalOwner;
        uint256 price;   
    }


    /** 
        createOrder method
        @notice create a buy order
        @param _nftCollection the addres of nftCollection
        @param _tokenId the tokenId of nftCollection
        @dev Throws if _nft does not exists
    */    
    function createOrder(NftCollection _nftCollection, uint256 _tokenId) external payable {
        BuyProposalStatus status = nftTrades[_nftCollection][_tokenId].status;
        require( status == BuyProposalStatus.Open || status == BuyProposalStatus.NotCreated, "no proposals for this Nft");
        //payable(address(this)).transfer(msg.value);
        nftTrades[_nftCollection][_tokenId].status = BuyProposalStatus.Open ;
        BuyProposals memory proposals;
        proposals.status = BuyProposalStatus.Open;

        BuyProposal memory buyProposal;
        buyProposal.proposalOwner = payable(msg.sender);
        buyProposal.price = msg.value;

        nftTrades[_nftCollection][_tokenId].buyProposals.push(buyProposal);
        
        emit CreateProposalBuyOrder(address(_nftCollection), _tokenId, nftTrades[_nftCollection][_tokenId].buyProposals.length, buyProposal.proposalOwner, buyProposal.price);
    }

    /** 
        process a buy order
        @notice the nft owner change 
        @param _nftCollection the addres of nftCollection
        @param _tokenId the tokenId of nftCollection
        @param _proposalIndex the index of buy proposal
        @dev Throws if _nft does not exists
    */  
    function processOrder(NftCollection _nftCollection, uint256 _tokenId, uint _proposalIndex ) external {
        require(msg.sender == _nftCollection.ownerOf(_tokenId), "You are not the tokenId owner");

        require(_proposalIndex < nftTrades[_nftCollection][_tokenId].buyProposals.length, "this proposal for this index does not exists");
        require(nftTrades[_nftCollection][_tokenId].status == BuyProposalStatus.Open, "no proposals for this Nft");
        nftTrades[_nftCollection][_tokenId].status = BuyProposalStatus.Executed;

        BuyProposal storage buyProposal = nftTrades[_nftCollection][_tokenId].buyProposals[_proposalIndex];
        NftCollection nftCollection = NftCollection(_nftCollection);
        payable(address(_nftCollection.ownerOf(_tokenId))).transfer(buyProposal.price);

        nftCollection.changeNftOwner(buyProposal.proposalOwner, _tokenId);
        

        /*for (uint index = 0; index < nftTrades[_nftCollection][_tokenId].buyProposals.length; index++ ) {
            if(index != proposalIndex) {
                BuyProposal storage notAcceptedProposal = nftTrades[_nftCollection][_tokenId].buyProposals[proposalIndex];
                notAcceptedProposal.proposalOwner.transfer(notAcceptedProposal.price);
            }
        }*/
 
        emit ProcessProposalBuyOrder(address(_nftCollection), _tokenId, proposalIndex);
    }

    /**
        @notice cancel a buy order process
     */
    function cancelOrders(NftCollection _nftCollection, uint256 _tokenId) external onlyOwner {
        require(nftTrades[_nftCollection][_tokenId].status == BuyProposalStatus.Open, "no proposals for this Nft");
        nftTrades[_nftCollection][_tokenId].status = BuyProposalStatus.Cancelled;
    }


    /*
        getBuyProposal
    **/
    function getBuyProposals(NftCollection _nftCollection, uint256 _tokenId, uint _index) external view returns (BuyProposal memory) {
        return nftTrades[_nftCollection][_tokenId].buyProposals[_index];
    }

    /**
        Return true if trade is opened
     */
    function isTradeOpen(NftCollection _nftCollection, uint256 _tokenId) external view returns (bool) {
        return nftTrades[_nftCollection][_tokenId].status == BuyProposalStatus.Open;
    }
}