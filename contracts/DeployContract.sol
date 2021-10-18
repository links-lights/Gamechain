pragma solidity ^0.8.0;

import "./NFToken.sol";

contract DeployContract {
    event Add(address);
    function getNewContract() public returns(uint){
        emit Add(address(new GameNFT()));
        
    }
    function reward(address player, uint256 index, uint256 amount) public {
        
        _mint(player, index, amount, "");
    }
    
} 