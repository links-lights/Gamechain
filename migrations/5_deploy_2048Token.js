const TZFEToken = artifacts.require("TZFEToken");

module.exports = function (deployer) {
  deployer.deploy(TZFEToken);
};
