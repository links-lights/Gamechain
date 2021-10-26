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
    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/QmZGKtV1qMbHtcuqbawv1Sy5EM1ot9raRx97zyJpZpoCCr/"
        )
    {}

    function reward(address _user, uint256 _tokenId) public {
        require(_tokenId >= 0 && _tokenId < 5);
        _mint(_user, _tokenId, 1, "");
    }
}
