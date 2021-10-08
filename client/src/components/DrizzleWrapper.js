import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import Routes from "./Routes";

function DrizzleWrapper() {
  return (
    <DrizzleContext.Consumer>
      {(drizzleContext) => {
        const { drizzle, drizzleState, initialized } = drizzleContext;

        if (!initialized) {
          return "Loading...";
        }
        return <Routes drizzle={drizzle} drizzleState={drizzleState} />;
      }}
    </DrizzleContext.Consumer>
  );
}

export default DrizzleWrapper;
