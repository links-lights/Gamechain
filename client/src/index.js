import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import history from "./history";
import DrizzleWrapper from "./components/DrizzleWrapper";
import { BrowserRouter as Router } from "react-router-dom";

//Drizzle
import { Drizzle, generateStore } from "@drizzle/store";
import { DrizzleContext } from "@drizzle/react-plugin";
import Greeter from "./artifacts/Greeter.json";
import SimpleStorage from "./artifacts/SimpleStorage.json";
import TZFEToken from './artifacts/TZFEToken.json';


//Drizzle instance
const options = { contracts: [Greeter, SimpleStorage, TZFEToken] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <DrizzleContext.Provider drizzle={drizzle}>
      <Router history={history}>
        <DrizzleWrapper />
      </Router>
    </DrizzleContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
