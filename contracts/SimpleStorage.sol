// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract SimpleStorage {
    string public dataURL;

    function setURL(string memory _dataURL) public {
        dataURL = _dataURL;
    }

    function get() public view returns (string memory) {
        return dataURL;
    }
}
