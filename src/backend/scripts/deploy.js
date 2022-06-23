
async function main() {
 
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());


  const Swap = await ethers.getContractFactory("Swap");
  const swap = await Swap.deploy();

  console.log("Swap contract address", swap.address)

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
