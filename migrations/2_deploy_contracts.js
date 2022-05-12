var NftFactory = artifacts.require("./NftFactory.sol");
var NftCollectionFactory = artifacts.require("./NftCollectionFactory.sol");


module.exports = function(deployer) {
  deployer.deploy(NftFactory);
  deployer.deploy(NftCollectionFactory);
};
