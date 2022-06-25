//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Swap {
    string public name = "Swap Eth or Tokens";
    // address[] public wallet_accounts; 
    // mapping(address=>uint) public percentSend;

    // function addAccounts(address _account, uint _percent) public {

    //     wallet_accounts.push(_account);
    //     percentSend[_account] = _percent;
    // }

    function distribute(address _account, uint percent, uint weight) payable public {
        uint value = msg.value;
        // uint percent = percentSend[_account];
        payable(_account).transfer( value * percent / weight );
    } 
}