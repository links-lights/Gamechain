const GameNFT = artifacts.require("GameNFT");

module.exports = function (deployer) {
  deployer.deploy(GameNFT);
};