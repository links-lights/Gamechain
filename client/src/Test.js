import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import Game from "./Game";

function Test() {
  return (
    <DrizzleContext.Consumer>
      {(drizzleContext) => {
        const { drizzle, drizzleState, initialized } = drizzleContext;

        if (!initialized) {
          return "Loading...";
        }
        return <Game drizzle={drizzle} drizzleState={drizzleState} />;
      }}
    </DrizzleContext.Consumer>
  );
}

export default Test;
