var NftTrade = artifacts.require("NftTrade");
var NftCollectionFactory = artifacts.require("NftCollectionFactory");

module.exports = function(deployer) {
    deployer.deploy(NftTrade);
    deployer.deploy(NftCollectionFactory);
};
