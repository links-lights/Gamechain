# GameChain

Distributed version of the popular game 2048 hosted on IPFS. With a system of rewards with tokens on the Ethereum blockchain.

## Tech Stack

### Smart Contracts:

- Solidity
- Truffle
- OpenZeppellin

### Backend:

- IPFS
- Ganache (dev)
- Ethereum

### Frontend:

- React
- Drizzle
- Material-UI
- Three.js

## Setup

1. Clone Repository \
   `git clone git@github.com:links-lights/Gamechain.git`\
   `cd Gamechain`

2. Install Dependencies \
   `cd client` \
   `npm install`

3. Download and QuickStart [Ganache](https://www.trufflesuite.com/ganache)

4. Migrate Contracts \
   `truffle migrate --reset`

5. Run GameChain \
   `npm run start`
   Browser will launch on [localhost:3000](http://localhost:3000).

### Live

GameChain: https://holy-rice-8295.on.fleek.co/

## Our goal

We wanted to tackle centralized architecture but offering a simple game where the reward system is centered around the Blockchain. We were adamant from the beginning that it wasn’t just about 2048, but rather our approach to help shape the future in a more decentralized world. We wanted to give power to the individual instead of an established entity. Our interests in Blockchain fueled our journey with this project and we look to continue to learn more in the hopes of developing something that can shift the way we live.

Our Application is a decentralized application where users can connect their ethereum wallet to play the game 2048, win tokens and NFTs, save their accounts and score; all on a distributed architecture!

We built the app using Solidity in a Truffle developmental environment. Our Tokens and NFTs were built off OpenZeppelin implementation of ERC20 and ERC1155 standards. To interact with the data we connect to Orbit-db API via Infura IPFS node. Contract deployment was also accomplished through Infura Ethereum node onto the Ropsten Test Network. The Front End is built using React, Three.js and Material-UI. The Redux store is managed using Drizzle react-hooks library that handles connection to smart contracts via web3.js within the app.

In order to deploy a smart contract onto Ropsten, we need to set up a free infura account and create a project key on https//infura.io. Then we get some free fake ether on https://faucet.ropsten.be/. And then set up configuration in config file and run truffle migrate --network ropsten in the terminal. Ropsten is one of largest test networks for testing deploying a smart contract before deploying to Ethereum Mainnet and allows blockchain developments to test their work in a live setting without costing real ether.

We are looking to incorporate an actual exchange where users can exchange tokens for ether and vice versa. We would also like to expand upon the community feature by introducing forums to allow people to interact with each other. We would also be interested in expanding the amount of games people can choose from to play.
