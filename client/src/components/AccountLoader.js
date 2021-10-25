import React from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin'
import Account from './Account'

const AccountLoader = () => {
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    accounts: drizzleState.accounts,
    drizzleStatus: drizzleState.drizzleStatus
  }))
  if(drizzleState.drizzleStatus.initialized){

    return <Account accounts={drizzleState.accounts} />
  }
  else return "Please connect to your ethereum account with MetaMask browser extension"
}

export default AccountLoader;
