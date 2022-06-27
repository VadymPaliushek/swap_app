# Swap smart contract

This project is a smart contract which swaps ethers to several accounts with
 weights.

## Available Scripts

In the project directory, you can run:

### `npm install`
Install the dependencies in package.json.

### `npm install dotenv`
Install the env dependency in package.json and use variables in env.file.

### `npx hardhat compile`
Compile the contracts in the project.

### `npx hardhat node`
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
And Show the accounts.

### `npx hardhat run --network matic src/backend/scripts/deploy.js`
Deploy the smart contract in the matic polygon network

### `npx hardhat run --network localhost src/backend/scripts/deploy.js`
Deploy the smart contract in the localhost hardhat network

### `npx hardhat test --network localhost`
Test the smart contract in hardhat.

## the way to set environment values in .env. file
### `private key`
In Metamask,  click the three dots button named Account Options in the right top of the Metamask UI, click the Accounts details and click Export Privatu Key.
And input the password and copy and paste your private key.

### `private Secret Recovery Phrase`
 In Metamask, click the rounded image button in the right top, click the Setting button. Next, click the Security & Privacy and click the Reveal Secret Recovery Phrase button.
 And input the password and copy and paste your private Secret Recovery Phrase.




