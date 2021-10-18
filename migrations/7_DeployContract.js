const DeployContract = artifacts.require("DeployContract");

module.exports = function (deployer) {
  deployer.deploy(DeployContract);
};