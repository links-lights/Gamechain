
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
    it('Owner minted 9000 regular NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 0);
      const balance = balanceObj.words[0];
      assert.equal(balance, 9000)

    })
  })
  describe('token deployed', async () => {
    it('Owner minted 900 rare NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 1);
      const balance = balanceObj.words[0];
      assert.equal(balance, 900)

    })
  })
  describe('token deployed', async () => {
    it('Owner minted 90 superRare NFToken', async () => {
      const owner = await gameNFT.owner();
      const balanceObj = await gameNFT.balanceOf(owner, 2);
      const balance = balanceObj.words[0];
      assert.equal(balance, 90)

    })
  })
  describe('reward regular NFToken deployed', async () => {
    it('player gets 10 regular NFToken as reward', async () => {
      const player = '0x7BFbd3BC65431580612AE985c542526369443E2A';
      const originalBalanceObj = await gameNFT.balanceOf(player, 0);
      const originalBalance = originalBalanceObj.words[0];
      await gameNFT.reward(player, 10);
      const newBalanceObj = await gameNFT.balanceOf(player, 0);
      const newBalance = newBalanceObj.words[0];
      assert.equal(newBalance - originalBalance, 10)
    })
  })
})
