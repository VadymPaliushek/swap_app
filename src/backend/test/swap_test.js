const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Swap", function () {

  let accounts
  let swap
  let percents = [5, 5, 10] // In frontend, weights will be set.
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
      let weight = 0
      for(let i = 0; i < count; i ++){
        weight += percents[i]
      }
      // const initialAdd1Balance = await accounts[1].getBalance()
      // console.log("initialAdd1Balance==", +fromWei(initialAdd1Balance))
      console.log("length===", accounts.length)
      console.log("weight==", weight)
      
      for(let i = 1; i < count; i ++) {
        console.log("account"+i, accounts[i].address)
        const initialAdd1Balance = await accounts[i].getBalance()
        console.log("initialAdd1Balance==", +fromWei(initialAdd1Balance))
        // await swap.addAccounts(accounts[i].address, percents[i]*100)
        await swap.distribute(accounts[i].address, percents[i], weight, { value: toWei(sendValue) })
        const finalAdd1Balance = await accounts[i].getBalance()
        console.log("finalAdd1Balance==", +fromWei(finalAdd1Balance))
        expect(+fromWei(finalAdd1Balance)).to.equal(+fromWei(initialAdd1Balance) + 200*percents[i]/weight)
      }
    })
  })
});
