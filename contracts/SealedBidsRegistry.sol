pragma solidity 0.5.12;

contract SealedBidsRegistry {

    event OfferMade(address indexed bidder, uint256 offerPlace, string sealedBid);
    event OfferCleared(address indexed bidder);

    mapping(address => string) public offers;

    function recordOffer(string memory sealedBid) public {
        offers[msg.sender] = sealedBid;
        emit OfferMade(msg.sender, now, sealedBid);
    }

    function clearOffer() public {
        delete offers[msg.sender];
        emit OfferCleared(msg.sender);
    }

    function getOffer(address bidder) public view returns (string memory) {
        return offers[bidder];
    }

}
