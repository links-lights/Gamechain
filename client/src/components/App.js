import React, { useEffect, useState } from "react";
import ipfs from "../ipfs";
import { fetchUser, changeUser, createUser } from "../db/models/user";

import "../styles/App.css";

const App = (props) => {
  const [buffer, setBuffer] = useState(null);
  const [account, setAccount] = useState(props.drizzleState.accounts[0]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);
  const [_ipfs, setIPFS] = useState(null);

  useEffect(() => {
    //* immediately invoked function
    (async () => {
      setIPFS(await ipfs);
      try {
        const _user = (await fetchUser(account))[0];
        if (Object.keys(_user).length === 0) {
          throw new Error();
        }
        setUser(_user);
      } catch (error) {
        const _user = (
          await createUser(
            account,
            account,
            "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe",
            0
          )
        )[0];
        setUser(_user);
      }
      setBalance(
        await props.drizzle.contracts.TZFEToken.methods
          .balanceOf(account)
          .call()
      );
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
    let hash, _user;
    if (buffer) {
      hash = await _ipfs.add(buffer);
      _user = (
        await changeUser(
          account,
          user.username,
          hash.cid.toString(),
          user.score
        )
      )[0];
    } else {
      _user = (
        await changeUser(account, user.username, user.imageHash, user.score)
      )[0];
    }

    setUser(_user);
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
        <h2>Balance: {balance}</h2>
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
