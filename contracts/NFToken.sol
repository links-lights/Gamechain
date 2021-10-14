pragma solidity ^0.8.0;


import "../client/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GameNFT is ERC1155, Ownable {
    uint256 public constant regular = 0;
    uint256 public constant rare = 1;
    uint256 public constant superRare = 2;

// need to pass in an URI addrees from IPFS behind ERC1155 later not sure? but it works fine as it is right now
    constructor() ERC1155("GNFT") {
       _mint(msg.sender, regular, 9000, "");
       _mint(msg.sender, rare, 900, "");
       _mint(msg.sender, superRare, 90, "");
    }
    
     function reward(address player, uint256 amount) public {
        require (amount > 0);
        _mint(player, regular, amount, "");
    }
}
