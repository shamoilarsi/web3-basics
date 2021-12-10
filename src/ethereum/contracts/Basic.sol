pragma solidity ^0.4.17;

// anyone can contribute. eth can be removed by the account that created the manager 

contract Basic {
    address public manager;
    uint public minAmount;

     constructor(uint amount) public {
        manager = msg.sender;
        minAmount = amount;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable {
        require(msg.value >= minAmount);
    }

    function returnContribution() public restricted {
        manager.transfer(address(this).balance);
    }
}