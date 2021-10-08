import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import AppRunner from "./AppRunner";
import Test from "./Test";

const Routes = (props) => {
  return (
    <>
      <div className="Navbar">
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
      </div>
      <Switch>
        <Route exact path="/" component={AppRunner} />
        <Route exact path="/game" component={Test} />
      </Switch>
    </>
  );
};

export default Routes;
