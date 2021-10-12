
const TZFEToken = artifacts.require("./TZFEToken.sol")

contract("TZFEToken", accounts=> {
  let tzfeToken

  beforeEach(async () => {
    tzfeToken = await TZFEToken.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      //console.log(tzfeToken)
      const address = await tzfeToken.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
  describe('token deployed', async () => {
    it('owner gets 1000 token', async () => {
      const owner = await tzfeToken.owner();
      const balanceObj = await tzfeToken.balanceOf(owner);
      const balance = balanceObj.words[0];
      assert.equal(balance, 1000)

    })
  })
  describe('reward token deployed', async () => {
    it('player gets 90 token as reward', async () => {
      const player = '0x969E5682346759E90084D3BeB772E37eDb9B5Fc7';
      const originalBalanceObj = await tzfeToken.balanceOf(player);
      const originalBalance = originalBalanceObj.words[0];
      await tzfeToken.reward(player, 90);
      const newBalanceObj = await tzfeToken.balanceOf(player);
      const newBalance = newBalanceObj.words[0];
      assert.equal(newBalance - originalBalance, 90)
    })
  })
})
