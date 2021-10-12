import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import Game from "./Game";

const Routes = (props) => {
  const { drizzleState, drizzle } = props;
  return (
    <>
      <Navbar />
      <Switch>
        {/* This is how you can pass props in routes -> render method */}
        <Route
          exact
          path="/"
          render={(props) => {
            //*  Reason of {...props} -> https://stackoverflow.com/questions/43469071/react-react-router-dom-pass-props-to-component
            return (
              <App {...props} drizzle={drizzle} drizzleState={drizzleState} />
            );
          }}
        />
        <Route
          exact
          path="/game"
          render={(props) => (
            <Game {...props} drizzle={drizzle} drizzleState={drizzleState} />
          )}
        />
      </Switch>
    </>
  );
};

export default Routes;
