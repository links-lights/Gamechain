pragma solidity ^0.8.0;


import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TZFEToken is ERC20{
    string public urlHash;
    constructor() ERC20("TZFE", "TFE") {
        _mint(msg.sender, 1000);
    } 
    function reward(address player, uint256 amount) public {
        require (amount > 0);
        _mint(player, amount);
    }
}