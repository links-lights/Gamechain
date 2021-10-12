import React, { useEffect, useState } from "react";
import ipfs from "../ipfs";

import "../styles/App.css";

const App = (props) => {
  const [ipfsHash, setIpfsHash] = useState(
    "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe"
  );
  const [newImage, setNewImage] = useState("");
  const [contract, setContract] = useState(
    props.drizzle.contracts.SimpleStorage
  );
  const [buffer, setBuffer] = useState(null);
  const [account, setAccount] = useState(props.drizzleState.accounts[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //* immediately invoked function
    const runExample = async () => {
      //* Get the value from the contract to prove it worked.
      try {
        const _ipfsHash = await contract.methods.get().call();
        if (_ipfsHash) {
          //* Update state with the result.
          setIpfsHash(_ipfsHash);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (contract !== null) {
      runExample();
      setLoading(false);
    }
  }, [contract, newImage]);

  const onChange = (event) => {
    const file = event.target.files[0];
    //* Strange thing - We need to read about it later on
    const reader = new window.FileReader();
    //* Also strang
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      //* Buffer - thing from node!
      //* We can read about it later
      //* Ipfs can eat only that type of information
      setBuffer(Buffer(reader.result));
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    //* ipfs api
    ipfs.files.add(buffer, async (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      //* Saves it on blockchain
      await contract.methods.setURL(result[0].hash).send({
        from: account,
      });
      //* to display this image on the page
      setNewImage(result[0].hash);
    });
    //* Saves it locally in current session
    // this.setState({ ipfsHash: result[0].hash });
  };
  if (!loading && account) {
    return (
      <div className="App">
        <div>{account}</div>
        <h1>Proof of Concept</h1>
        <img
          src={`https://ipfs.io/ipfs/${ipfsHash}`}
          alt=""
          className="App-image"
        />

        <h2>Upload File (image is better, or gif)</h2>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={onChange} />
          <button type="submit" className="App-button">
            Upload
          </button>
        </form>
      </div>
    );
  } else {
    return !loading ? (
      <h3 className="App">Loading...</h3>
    ) : (
      <h3 className="App">
        Please connect to your ethereum account with MetaMask browser extension
      </h3>
    );
  }
};

export default App;
