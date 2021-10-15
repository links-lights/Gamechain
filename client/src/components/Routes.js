import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TrainingGame from "./Training";
import StartPage from "./StartPage";
import GameDescription from "./GameDescripion";
import Scoreboard from "./Scoreboard";

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
            <TrainingGame
              {...props}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          )}
        />
        <Route
          exact
          path="/start"
          render={(props) => (
            <StartPage
              {...props}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          )}
        />
        <Route
          exact
          path="/description"
          render={(props) => (
            <GameDescription
              {...props}
              drizzle={drizzle}
              drizzleState={drizzleState}
            />
          )}
        />
        <Route exact path="/scoreboard" component={Scoreboard} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
