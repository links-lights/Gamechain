pragma solidity ^0.8.0;


import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TZFEToken is ERC20{
    constructor(uint256 amount) ERC20("TZFE", "TFE") {
        require(amount > 0);
        _mint(msg.sender, amount);
    } 
    function reward(address player, uint256 amount) public {
        require (amount > 0);
        _mint(player, amount);
    }
}