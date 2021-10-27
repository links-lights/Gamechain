import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import Game from "./Game";
import TokenAward from "./TokenAward";
import { Paper, Grid, Button, Box, Typography, Divider } from "@mui/material";
import TokenOddsTable from "./TokenOdds";
import NFTOddsTable from "./NFTOddsTable";
import { changeUser, fetchUser, createUser } from "../db/models/user";

function StartPage() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [user, setUser] = useState({});
  const [gameStart, setGameStart] = useState(false);

  const drizzleInstance = drizzleReactHooks.useDrizzle();

  const drizzleState = drizzleReactHooks.useDrizzleState((drizzleState) => ({
    accounts: drizzleState.accounts,
    status: drizzleState.drizzleStatus,
  }));
  console.log("this is high score is startPage", highScore, rewardAmount);
  const contracts = drizzleInstance.drizzle.contracts;
  const account = drizzleState.accounts[0];

  useEffect(() => {
    (async () => {
      try {
        if (account) {
          const _user = (await fetchUser(account))[0];
          console.log("user", _user);
          if (!_user) {
            throw new Error();
          }
          setUser(_user);
          if (_user.score > highScore) {
            setHighScore(_user.score);
          }
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
        console.log("user", _user);
        setUser(_user);
        if (_user.score > highScore) {
          console.log("yes, im here no");
          setHighScore(_user.score);
        }
      }
    })();
  }, [account, user, highScore]);

  function awardAmount(amount) {
    setRewardAmount(amount);
  }

  async function postHighScore(amount) {
    console.log("postHighScore fired");
    try {
      if (amount > highScore) {
        setHighScore(amount);
        await changeUser(account, user.username, user.imageHash, amount);
      }
    } catch (err) {
      alert(err);
    }
  }

  function checkInitialize() {
    if (drizzleState.status.initialized) {
      const arrow_keys_handler = function (e) {
        switch (e.code) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "Space":
            e.preventDefault();
            break;
          default:
            break;
        }
      };
      window.addEventListener("keydown", arrow_keys_handler, false);

      setGameStart(!gameStart);
    } else alert("Account not loaded, please try again");
  }

  return (
    <Box
      component={Paper}
      sx={{
        minHeight: "48vw",
      }}
    >
      <Grid container direction="column" className="sections">
        <Grid
          item
          className="topSpacer"
          sx={{
            height: "5vw",
            textAlign: "center",
          }}
        >
          <Typography variant="h3">
            2048
            <Divider />
          </Typography>
        </Grid>
        <Grid item container className="GameArea" sx={{ minHeight: "30vw" }}>
          <Grid item xs={4} p={6} container alignContent="center">
            <Box
              sx={{
                backgroundColor: "#CCCCCC",
                borderRadius: "25px",
              }}
            >
              <Typography variant="h5" textAlign="center" p={1}>
                Odds for Tokens & Nfts
              </Typography>
              <Divider />
              <Typography variant="body2" p={2}>
                The Odds to win Tokens and NFTs are based on % that increase
                with block # milestones and score.
                <br></br>
                <br></br>
                To see a table of percentage odds, click the How-To-Play on the
                Navigation Bar to see a breakdown.
                <br></br>
                <br></br>
                Check your score against others under the scoreboard Tab.
                <br></br>
                <br></br>
                Feel free to practice without connection to the blockChain under
                Training.
                <br></br>
                <br></br>
                Enjoy!
                <br></br>
                <br></br>
                May the odds be in your favor~
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: "40vw",
            }}
          >
            {gameStart ? (
              <Game
                contracts={contracts}
                account={account}
                awardAmount={awardAmount}
                highScore={postHighScore}
                setScore={setScore}
              />
            ) : (
              <Button onClick={() => checkInitialize()}>Start Game</Button>
            )}
          </Grid>
          <Grid item xs={4}>
            <TokenAward highScore={highScore} rewardAmount={rewardAmount} />
          </Grid>
        </Grid>
        <Grid item className="footer">
          {/* Enhancement: More information here */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default StartPage;
