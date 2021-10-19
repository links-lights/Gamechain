import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TrainingGame from "./Training";
import StartPage from "./StartPageFC";
import Scoreboard from "./Scoreboard";

const Routes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        {/* This is how you can pass props in routes -> render method */}
        <Route exact path ="/" component={App} />
        <Route exact path="/game" component={TrainingGame} />
        <Route exact path="/start" component={StartPage} />
        <Route exact path="/scoreboard" component={Scoreboard} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
