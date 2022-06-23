const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Swap", function () {

  let accounts
  let swap
  let count = 20
  let percents = [5, 5, 8, 2, 9, 1, 3.6, 6.4, 7, 3, 3, 7, 6, 4, 6, 4, 5, 5, 7, 3]
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
      
      const initialAdd1Balance = await accounts[1].getBalance()
      console.log("initialAdd1Balance==", +fromWei(initialAdd1Balance))
      console.log("length===", accounts.length)
      
      for(let i = 1; i < count; i ++) {
        console.log("account"+i, accounts[i].address)
        const initialAdd1Balance = await accounts[i].getBalance()
        console.log("initialAdd1Balance==", +fromWei(initialAdd1Balance))
        await swap.addAccounts(accounts[i].address, percents[i]*100)
        await swap.distribute(accounts[i].address, { value: toWei(sendValue) })
        const finalAdd1Balance = await accounts[i].getBalance()
        console.log("finalAdd1Balance==", +fromWei(finalAdd1Balance))
        expect(+fromWei(finalAdd1Balance)).to.equal(+fromWei(initialAdd1Balance) + 200*percents[i]*100/10000)
      }
    })
  })
});
