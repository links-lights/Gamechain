import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import Metadata from "./Metadata";

const MetadataLoader = () => {
  const drizzleState = drizzleReactHooks.useDrizzleState((drizzleState) => ({
    accounts: drizzleState.accounts,
    drizzleStatus: drizzleState.drizzleStatus,
  }));
  if (drizzleState.drizzleStatus.initialized) {
    return <Metadata accounts={drizzleState.accounts} />;
  } else
    return "Please connect to your ethereum account with MetaMask browser extension";
};

export default MetadataLoader;
