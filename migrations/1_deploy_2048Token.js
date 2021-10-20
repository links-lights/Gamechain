const TZFEToken = artifacts.require("TZFEToken");

module.exports = function (deployer) {
  deployer.deploy(TZFEToken, 1000);
};
