import React, { useEffect, useState } from "react";
import ipfs from "../ipfs";
import { Button } from "@mui/material"

import { fetchUser, changeUser, createUser } from "../db/models/user";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import EditAccount from "./EditAccount";
import "../styles/App.css";

const Account = (props) => {
  //drizzle
  const drizzleState = drizzleReactHooks.useDrizzleState((drizzleState) => ({
    accounts: drizzleState.accounts,
  }));
  const drizzleInstance = drizzleReactHooks.useDrizzle();

  //state
  const contracts = drizzleInstance.drizzle.contracts;
  const [account, setAccount] = useState(drizzleState.accounts[0]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);
  const [_ipfs, setIPFS] = useState(null);
  const [NFTs,setNFTs] = useState([]);
  const [edit, setEdit] = useState(false);

  //cycle
  useEffect(() => {
    //* immediately invoked function
    (async () => {
      console.log("should always have account", drizzleState.accounts);
      setIPFS(await ipfs);
      try {
        if (account) {
          const _user = (await fetchUser(account))[0];
          console.log("user", _user);
          if (!_user) {
            throw new Error();
          }
          setUser(_user);
        }
      } catch (error) {
        console.log("noooooooooo");
        console.error(error);
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
      setBalance(await contracts.TZFEToken.methods.balanceOf(account).call());
      setNFTs(await contracts.GameNFT.methods.balanceOfBatch([account,account,account,account,account],
      [0,1,2,3,4]).call());
      setLoading(false);
    })();
  }, [account]);

  const editToggle = () =>{
    setEdit(!edit);
  }

  //render
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

          <h3>
          {user.username}
          </h3>
          <Button onClick={()=>editToggle()}>Edit Account</Button>
        {edit ? (
          <EditAccount
          user={user}
          setUser={setUser}
          _ipfs={_ipfs}
          account={account}
          editToggle={editToggle}
          />
        ) : (<></>)}

        <h2>High Score: {user.score}</h2>
        <h2>Balance: {balance}</h2>
        <h2>NFTs: {NFTs.map(NFT => {
          return (NFT)
        })}</h2>
      </div>
    );
  } else {
    return !loading ? (
      <h3 className="App">Loading...</h3>
    ) : (
      <h3 className="App">
        Connecting to your Wallet
      </h3>
    );
  }
};

export default Account;
