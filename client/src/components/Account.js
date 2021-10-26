import React, { useEffect, useState } from "react";
import ipfs from "../ipfs";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Divider,
  CardHeader,
  Paper,
} from "@mui/material";
import SpinningCoin from "./SpinningCoin";
import { fetchUser, createUser } from "../db/models/user";
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
  const [NFTs, setNFTs] = useState([]);
  const [edit, setEdit] = useState(false);
  const [NFTMetadata, setNFTMetadata] = useState([]);

  //cycle
  useEffect(() => {
    //* immediately invoked function
    (async () => {
      const ipfs_ = await ipfs;
      console.log("should always have account", drizzleState.accounts);
      setIPFS(ipfs_);

      const path = `https://ipfs.io/ipfs/${await contracts.GameNFT.methods
        .uri(0)
        .call()}`;

      console.log(
        "events",
        await drizzleInstance.drizzle.contracts.TZFEToken.events.allEvents()
      );
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
      const balance = await contracts.GameNFT.methods
        .balanceOfBatch(
          [account, account, account, account, account],
          [0, 1, 2, 3, 4]
        )
        .call();

      setNFTs(balance);
      setNFTMetadata(
        await Promise.all(
          balance.map(async (num, ix) => {
            const newPath = path + `/${ix}.json`;

            const { data } = await axios.get(newPath);
            return data;
          })
        )
      );

      setLoading(false);
    })();
  }, [account, user]);

  const editToggle = () => {
    setEdit(!edit);
  };

  //render
  if (!loading && account) {
    console.log(NFTMetadata);
    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={5}
        p={3}
        sx={{
          minHeight: "45vw",
        }}
      >
        <Box
          className="WalletAddress"
          gridColumn="span 12"
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h6">Your Wallet Address : {account}</Typography>
        </Box>
        <Box className="AccountCard" gridColumn="span 4">
          <Card>
            <CardHeader title="Your Account" subheader="Avatar" />
            <CardMedia
              component="img"
              alt="User Avatar"
              image={`https://ipfs.io/ipfs/${user.imageHash}`}
            />
            <CardContent>
              <Typography>Username</Typography>
              <Divider />
              <Typography p={2} textAlign="center">
                {user.username}
              </Typography>
            </CardContent>
            <CardActions>
              {edit ? (
                <EditAccount
                  user={user}
                  setUser={setUser}
                  _ipfs={_ipfs}
                  account={account}
                  editToggle={editToggle}
                />
              ) : (
                <></>
              )}
            </CardActions>
            <CardActions>
              <Button onClick={() => editToggle()}>Edit Account</Button>
            </CardActions>
          </Card>
        </Box>
        <Box component={Paper} gridColumn="span 8">
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
            <Box
              gridColumn="span 12"
              p={8}
              sx={{
                backgroundColor: "#CCCCCC",
              }}
            >
              <Typography textAlign="center" variant="h4">
                Highest Score:
              </Typography>
              <Typography color="secondary" textAlign="center" variant="h5">
                <br></br>
                {user.score} Pts
              </Typography>
            </Box>
            <Box className="Tokens" gridColumn="span 6" p={5}>
              <Typography variant="h4">Token Balance</Typography>
              <SpinningCoin /> {balance}
            </Box>
            <Box className="NFTs" gridColumn="span 6" p={5}>
              <Typography variant="h4">Collectibles</Typography>
              {NFTs.reduce((acc, cur) => acc + cur, 0) > 0 ? (
                <ol>
                  {NFTs.filter((num) => num > 0).map((NFT, idx) => {
                    return (
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        className="TokenCard"
                        gridColumn="span 10"
                        p={6}
                        gap={10}
                        sx={{
                          maxHeight: "31vw",
                          flexWrap: "wrap",
                        }}
                      >
                        <Card>
                          <CardHeader
                            title={NFTMetadata[idx].name}
                            sx={{
                              height: "6vw",
                            }}
                          />
                          <CardMedia
                            component="img"
                            alt={NFTMetadata[idx].name}
                            image={NFTMetadata[idx].imageHash}
                            sx={{
                              height: "7vw",
                            }}
                          />
                          <CardContent>
                            <Typography>Quantity</Typography>
                            <Divider />
                            <Typography p={2} textAlign="center">
                              {NFT}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    );
                  })}
                </ol>
              ) : (
                <h4>Currently you do not have NFT (._. )( ._.)</h4>
              )}

              <h4>Want know more about our unique tokens? </h4>
              <Link to="/metadata">Check out this page!</Link>
            </Box>
            {/* <Box gridColumn="span 12" p={5}>
                  Transactions
                </Box> */}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return !loading ? (
      <h3 className="App">Loading...</h3>
    ) : (
      <h3 className="App">Connecting to your Wallet</h3>
    );
  }
};

export default Account;
