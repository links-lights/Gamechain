import React from "react";
import { Route, Switch } from "react-router-dom";
import AccountLoader from "./AccountLoader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TrainingGame from "./Training";
import StartPage from "./StartPageFC";
import Scoreboard from "./Scoreboard";
import Token from "./Token";
import LandingPage from "./LandingPage";
import MetadataLoader from "./MetadataLoader";

const Routes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        {/* This is how you can pass props in routes -> render method */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/account" component={AccountLoader} />
        <Route exact path="/game" component={TrainingGame} />
        <Route exact path="/start" component={StartPage} />
        <Route exact path="/scoreboard" component={Scoreboard} />
        <Route exact path="/token" component={Token} />
        <Route exact path="/metadata" component={MetadataLoader} />
      </Switch>
      <Footer />
    </>
  );
};

export default Routes;
