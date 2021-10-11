const TZFEToken = artifacts.require("./TZFEToken.sol")

contract("TZFEToken", accounts=> {
  let tzfeToken

  before(async () => {
    tzfeToken = await TZFEToken.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      console.log(tzfeToken)
      const address = await tzfeToken.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
})
