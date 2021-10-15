pragma solidity ^0.8.0;


import "../client/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract GameNFT is ERC1155, Ownable {
    uint256 public constant OakTree = 0;
    uint256 public constant PineTree = 1;
    uint256 public constant WeepingWillow = 2;
    uint256 public constant BonsaiTree = 3;
    uint256 public constant CherryTree = 4;

// need to pass in an URI addrees from IPFS behind ERC1155 later not sure? but it works fine as it is right now
    constructor() ERC1155("https://ipfs.io/ipfs/QmWgVfbWDHHvLm9DSy6XV4ug97ah1XNKhCBFksr3ZbqJAf/{id}.json") {
       _mint(msg.sender, WeepingWillow, 1, "");
       _mint(msg.sender, OakTree, 1, "");
       _mint(msg.sender, PineTree, 1, "");
       _mint(msg.sender, BonsaiTree, 1, "");
       _mint(msg.sender, CherryTree, 1, "");
    }
    
   
}
