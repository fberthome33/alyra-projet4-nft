var NftMarketPlace = artifacts.require("NftMarketPlace");
var NftCollectionFactory = artifacts.require("NftCollectionFactory");

module.exports = function(deployer) {
    deployer.deploy(NftMarketPlace);
    deployer.deploy(NftCollectionFactory);
};
