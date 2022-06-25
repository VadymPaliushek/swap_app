//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Swap {
    string public name = "Swap Eth or Tokens";
    address[] public wallet_accounts; 
    mapping(address=>uint) public percentSend;
    uint public weight = 0;

    function addAccount(address _account, uint _percent) public {

        wallet_accounts.push(_account);
        percentSend[_account] = _percent;
        weight += _percent;
    }

    function distribute() payable public {
        uint value = msg.value;
        uint count = wallet_accounts.length;
        require(count > 0, "Account must be set more than one.");
        for (uint i = 0; i < count; i ++) {
            payable(wallet_accounts[i]).transfer( value * percentSend[wallet_accounts[i]] / weight );
        }

        delete wallet_accounts;
    } 
}