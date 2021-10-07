import React, { Component } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfsHash: "",
      web3: null,
      accounts: null,
      contract: null,
      buffer: null,
      account: null,
      loading: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        {
          web3,
          accounts,
          contract: instance,
          account: accounts[0],
          value: "",
          loading: false,
        },
        this.runExample
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract, account } = this.state;

    //* Get the value from the contract to prove it worked.
    try {
      const ipfsHash = await contract.methods.get().call();
      if (ipfsHash) {
        //* Update state with the result.
        this.setState({ ipfsHash });
      }
    } catch (error) {
      console.error(error);
    }
  };

  onChange(event) {
    const file = event.target.files[0];
    //* Strange thing - I need to read about it later on
    const reader = new window.FileReader();
    //* Also strang shit
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      //* Buffer - weeb shit from node!
      //* I can read about it later
      //* Ipfs can eat only that type of information
      this.setState({ buffer: Buffer(reader.result) });
    };
  }
  onSubmit(event) {
    event.preventDefault();
    //* ipfs api
    ipfs.files.add(this.state.buffer, async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      //* Saves it on blockchain
      await this.state.contract.methods.setURL(result[0].hash).send({
        from: this.state.account,
      });

      this.runExample();
    });
    //* Saves it locally in current session
    // this.setState({ ipfsHash: result[0].hash });
  }

  render() {
    if (!this.state.loading && this.state.account) {
      return (
        <div className="App">
          <nav className="navbar pure-menu pure-menu-horizontal App-navbar">
            {this.state.account}
          </nav>
          <h1>Proof of Concept</h1>
          <img
            src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`}
            alt=""
            className="App-image"
          />
          {!this.state.ipfsHash.length ? (
            <>
              <h2>Upload File</h2>
              <form onSubmit={this.onSubmit}>
                <input
                  type="file"
                  value={this.state.value}
                  onChange={this.onChange}
                />
                <button type="submit" className="App-button">
                  Upload your image here
                </button>
              </form>
            </>
          ) : (
            <h1>Peace</h1>
          )}
        </div>
      );
    } else {
      return !this.state.loading ? (
        <h3 className="App">Loading...</h3>
      ) : (
        <h3 className="App">
          Please connect to your ethereum account with MetaMask browser
          extension
        </h3>
      );
    }
  }
}

export default App;
