
const GameNFT = artifacts.require("./GameNFT.sol")

contract("GameNFT", accounts=> {
  let gameNFT

  beforeEach(async () => {
    gameNFT = await GameNFT.deployed()
  })
  describe('deployment', async () => {
    it('deploys successfully', async () => {

      const address = await gameNFT.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
  describe('token deployed', async () => {
    it('Owner minted 1 OakTree NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 0);
      const balance = balanceObj.words[0];
      assert.equal(balance, 1)

    })
  })
  describe('token deployed', async () => {
    it('Owner minted 1 PineTree NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 1);
      const balance = balanceObj.words[0];
      assert.equal(balance, 1)

    })
  })
  describe('token deployed', async () => {
    it('Owner minted 1 WeepingWillow NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 2);
      const balance = balanceObj.words[0];
      assert.equal(balance, 1)

    })
  })
  describe('token deployed', async () => {
    it('Owner minted 1 BonsaiTree NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 3);
      const balance = balanceObj.words[0];
      assert.equal(balance, 1)

    })
  })
  describe('token deployed', async () => {
    it('Owner minted 1 CherryTree NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 4);
      const balance = balanceObj.words[0];
      assert.equal(balance, 1)

    })
  })
  
})
