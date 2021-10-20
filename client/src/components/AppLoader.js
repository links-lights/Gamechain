import React from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin'
import App from './App'

const AppLoader = () => {
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    accounts: drizzleState.accounts,
    drizzleStatus: drizzleState.drizzleStatus
  }))
  if(drizzleState.drizzleStatus.initialized){

    return <App accounts={drizzleState.accounts} />
  }
  else return "Please connect to your ethereum account with MetaMask browser extension"
}

export default AppLoader;
