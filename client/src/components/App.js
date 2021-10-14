import React, { useEffect, useState } from "react";
import ipfs from "../ipfs";
import User from "../ipfs/user";

import "../styles/App.css";

const App = (props) => {
  const [buffer, setBuffer] = useState(null);
  const [account, setAccount] = useState(props.drizzleState.accounts[0]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [_ipfs, setIpfs] = useState(null);

  useEffect(() => {
    //* immediately invoked function
    (async () => {
      //* just for IPFS to work
      try {
        let _ipfs_;
        if (_ipfs) {
          _ipfs_ = _ipfs;
        } else {
          _ipfs_ = await ipfs;
          setIpfs(_ipfs_);
        }
        //* How we can read the data from ipfs
        const chunks = [];
        for await (const chunk of _ipfs_.files.read(`/users/${account}.JSON`)) {
          chunks.push(chunk);
        }
        const _user = Buffer.from(...chunks).toString("utf8");
        setUser(JSON.parse(_user));
      } catch (error) {
        setUser({
          username: account,
          imageHash: "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe",
          score: 0,
        });
      }
      setLoading(false);
    })();
  }, []);

  const onChangeUsername = (event) => {
    setUser({
      username: event.target.value,
      imageHash: user.imageHash,
      score: user.score,
    });
  };

  const onChange = async (event) => {
    const _file = event.target.files[0];
    //   //* Strange thing - We need to read about it later on
    const reader = new window.FileReader();
    //   //* Also strang

    reader.readAsArrayBuffer(_file);
    reader.onloadend = () => {
      //     //* Buffer - thing from node!
      //     //* We can read about it later
      //     //* Ipfs can eat only that type of information
      setBuffer(Buffer(reader.result));
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    //* ipfs api
    let hash;
    if (buffer) {
      hash = await _ipfs.add(buffer);
      await User(account, user.username, hash.cid.toString(), 0);
    } else {
      await User(account, user.username, user.imageHash, 0);
    }

    const chunks = [];
    for await (const chunk of _ipfs.files.read(`/users/${account}.JSON`)) {
      chunks.push(chunk);
    }
    const _user = Buffer.from(...chunks).toString("utf8");
    setUser(JSON.parse(_user));
    for await (const file of _ipfs.files.ls("/users")) {
      console.log(file.name);
    }
  };
  if (!loading && account) {
    return (
      <div className="App">
        <div>{account}</div>
        <h1>Account Info</h1>

        <img
          src={`https://ipfs.io/ipfs/${user.imageHash}`}
          alt=""
          className="App-image"
        />

        <form onSubmit={onSubmit}>
          <label>
            <h3>
              Username:
              <input value={user.username} onChange={onChangeUsername} />
            </h3>
          </label>
          <h2>Upload File (image is better, or gif)</h2>
          <input type="file" onChange={onChange} />
          <button type="submit" className="App-button">
            Save Changes
          </button>
        </form>
        <h2>High Score: {user.score}</h2>
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
