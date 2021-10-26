import React, { useEffect, useState } from "react";
import ipfs from "../ipfs";
import { Button, Box, Typography, Card, CardMedia, CardContent, CardActionArea , CardActions, Divider, CardHeader, Paper} from "@mui/material";
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

  //cycle
  useEffect(() => {
    //* immediately invoked function
    (async () => {
      console.log("should always have account", drizzleState.accounts);
      setIPFS(await ipfs);
      console.log('events', await drizzleInstance.drizzle.contracts.TZFEToken.events.allEvents())
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
      setNFTs(
        await contracts.GameNFT.methods
          .balanceOfBatch(
            [account, account, account, account, account],
            [0, 1, 2, 3, 4]
          )
          .call()
      );
      setLoading(false);
    })();
  }, [account, user]);

  const editToggle = () => {
    setEdit(!edit);
  };

  //render
  if (!loading && account) {
    return (
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5} p={3}
      sx={{
        border: "1px solid black",
        minHeight:"45vw"
        }}>
          <Box className="WalletAddress" gridColumn="span 12" sx={{textAlign:"center"}}>
            <Typography variant="h6">
              Your Wallet Address : {account}
            </Typography>
          </Box>
          <Box className="AccountCard" gridColumn="span 4">
            <Card>
              <CardHeader
              title="Your Account"
              subheader="Avatar"
              />
              <CardMedia
              component="img"
              alt="User Avatar"
              image={`https://ipfs.io/ipfs/${user.imageHash}`}

              />
              <CardContent>
                <Typography>
                  Username
                </Typography>
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
                <Box gridColumn="span 12" p={8}
                sx={{
                  backgroundColor:"#CCCCCC",
                }}>
                  <Typography textAlign="center" variant="h4">
                    Highest Score:
                  </Typography>
                  <Typography color="secondary" textAlign="center" variant="h5">
                    <br></br>
                  {user.score} Pts
                  </Typography>
                </Box>
                <Box className="Tokens" gridColumn="span 6" p={5}>
                  <Typography variant="h4">
                    Token Balance:
                  </Typography>
                  <SpinningCoin /> {balance}
                </Box>
                <Box className="NFTs" gridColumn="span 6" p={5}>
                  <Typography variant="h4">
                    NFTs:
                    </Typography>
                      <ol>
                      {NFTs.map((NFT, idx) => {
                        return (<li key={idx}>{NFT}</li>);
                      })}
                      </ol>
                </Box>
                {/* <Box gridColumn="span 12" p={5}>
                  Transactions
                </Box> */}
              </Box>
          </Box>
      </Box>



      // <div className="App">
      //   <div>{account}</div>
      //   <h1>Account Info</h1>

      //   <img
      //     src={`https://ipfs.io/ipfs/${user.imageHash}`}
      //     alt=""
      //     className="App-image"
      //   />

      //   <h3>{user.username}</h3>

        // {edit ? (
        //   <EditAccount
        //     user={user}
        //     setUser={setUser}
        //     _ipfs={_ipfs}
        //     account={account}
        //     editToggle={editToggle}
        //   />
        // ) : (
        //   <Button onClick={() => editToggle()}>Edit Account</Button>
        // )}

      //   <h2>High Score: {user.score}</h2>
      //   <h2>
          // Balance: {balance} <SpinningCoin />
      //   </h2>
      //   <h2>
      //     NFTs:{" "}
      //     {NFTs.map((NFT) => {
      //       return NFT;
      //     })}
      //   </h2>
      // </div>
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
