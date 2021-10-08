import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import App from "./App";

function AppRunner() {
  return (
    <DrizzleContext.Consumer>
      {(drizzleContext) => {
        const { drizzle, drizzleState, initialized } = drizzleContext;

        if (!initialized) {
          return "Loading...";
        }
        return <App drizzle={drizzle} drizzleState={drizzleState} />;
      }}
    </DrizzleContext.Consumer>
  );
}

export default AppRunner;
