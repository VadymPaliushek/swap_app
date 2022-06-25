const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Swap", function () {

  let accounts
  let swap
  // In frontend, weights will be set. And percents length will be set by customers. I set 3 percents.
  let percents = [5, 5, 10] 
  let sendValue = 200

  beforeEach(async function () {
    const Swap = await ethers.getContractFactory("Swap");
    
    accounts = await ethers.getSigners()
    swap = await Swap.deploy();
  })

  describe("Development", function() {
    it("it has a name", async function() {
        expect(await swap.name()).to.equal("Swap Eth or Tokens")
    })
  })
  describe("Distributing", function() {
    it("it sends ether to several wallets successfully", async function() {
      const count = percents.length
      let initialAdd1Balance = new Array()
      let finalAdd1Balance
      console.log("length===", accounts.length)
      let weight = 0
      for(let i = 1; i < count + 1; i ++){
        weight += percents[i-1]
        await swap.addAccount(accounts[i].address, percents[i-1])
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
});
