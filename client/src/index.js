import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import history from "./history";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";

//Drizzle
import { Drizzle, generateStore } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import TZFEToken from "./artifacts/TZFEToken.json";

//Drizzle instance
const options = { contracts: [TZFEToken] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
      <Router history={history}>
        <Routes />
      </Router>
    </drizzleReactHooks.DrizzleProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
