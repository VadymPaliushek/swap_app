//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Swap {
    string public name = "Swap Eth or Tokens";
    address[] public wallet_accounts; 
    uint public count;
    mapping(address=>uint) public percentSend;
    uint public weight = 0;

    function addAccount(address _account, uint _percent) public {

        require( _account != address(0), "account must not be null");
        wallet_accounts.push(_account);
        percentSend[_account] = _percent;
        weight += _percent;
    }

    function distribute() payable public {
        uint value = msg.value;
        count = wallet_accounts.length;
        require(count > 0, "Account must be set more than one.");
        for (uint i = 0; i < count; i ++) {
            if ( percentSend[wallet_accounts[i]] > 0) {
                payable(wallet_accounts[i]).transfer( value * percentSend[wallet_accounts[i]] / weight );
            }
        }
    }

    function removeAccount(address _account) public {
        
        uint id = getAccountId(_account);
        for (uint i = id; i < count; i ++) {
            wallet_accounts[i] = wallet_accounts[i+1];
        }
        wallet_accounts.pop();
        
        count = wallet_accounts.length;
    }

    function getAccountId(address _account) view public returns(uint){
        uint accoutId = 0;
        while(accoutId < count){
            if(_account == wallet_accounts[accoutId]) {
                break;
            } 
            accoutId++;
        }
        return accoutId;
    }
}