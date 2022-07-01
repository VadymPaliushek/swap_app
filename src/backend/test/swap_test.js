const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Swap", function () {

  let accounts
  let swap
  let weight = 0
  
  // In backend, weight length munst be small than accounts length.
  let percents = [5, 5, 0, 10] 
  const count = percents.length
  
  let sendValue = 200

  beforeEach(async function () {
    const Swap = await ethers.getContractFactory("Swap");
    
    accounts = await ethers.getSigners()

    swap = await Swap.deploy();

    for(let i = 1; i < count + 1; i ++){
      await swap.addAccount(accounts[i].address, percents[i-1])
    }
  })

  describe("Development", function() {
    it("it has a name", async function() {
        expect(await swap.name()).to.equal("Swap Eth or Tokens")
    })
  })
  describe("Distributing", function() {
    
    it("it sends ether to several wallets successfully", async function() {
   
      let initialAdd1Balance = new Array()
      let finalAdd1Balance
      console.log("length===", accounts.length)
      
      for(let i = 1; i < count + 1; i ++){
        weight += percents[i-1]
        console.log("account"+i, accounts[i].address)
        initialAdd1Balance[i] = +fromWei(await accounts[i].getBalance())
        console.log("initialAdd1Balance==", initialAdd1Balance[i])
      }

      // const initialAdd1Balance = await accounts[1].getBalance()
    
      console.log("weight==", await swap.weight())
      await swap.distribute({ value: toWei(sendValue) })
      
      for(let i = 1; i < count + 1; i ++) {
        
        finalAdd1Balance = await accounts[i].getBalance()
        console.log("finalAdd1Balance==", +fromWei(finalAdd1Balance))
        expect(+fromWei(finalAdd1Balance)).to.equal(initialAdd1Balance[i] + 200*percents[i-1]/weight)
      }
    })
  })
  describe("Managing Accounts", function() {
    it("Account is removed successfully", async function() {
        const remove_account = "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
        await swap.removeAccount(remove_account)
        let account_length = await swap.count()
        expect(account_length).to.equal(count - 1)
    })
  })
});
