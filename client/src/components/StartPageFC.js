import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import Game from "./Game";
import TokenAward from "./TokenAward";
import { Paper, Grid } from "@mui/material";
import RecipeReviewCard from "./GameDescripion";
import { changeUser, fetchUser, createUser } from "../db/models/user";

function StartPage() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  // const [board, setBoard] = useState([]);
  const [user, setUser] = useState({});

  const drizzleInstance = drizzleReactHooks.useDrizzle();
  console.log("instance", drizzleInstance);

  const drizzleState = drizzleReactHooks.useDrizzleState((drizzleState) => ({
    accounts: drizzleState.accounts,
  }));
  console.log("this is drizzleState", drizzleState);

  // const account = props.drizzleState.accounts[0];
  const contracts = drizzleInstance.drizzle.contracts;
  const account = drizzleState.accounts[0];

  useEffect(() => {
    (async () => {
      if (account) {
        let _user = (await fetchUser(account))[0];
        if (_user === undefined) {
          _user = (
            await createUser(
              account,
              account,
              "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe",
              0
            )
          )[0];
        }
        setUser(_user);
        setHighScore(_user.score);
      }
      // console.log('render', highScore, score, board, rewardAmount )
    })();
  }, [highScore, account]);

  function awardAmount(amount) {
    setRewardAmount(amount);
  }

  async function postHighScore() {
    console.log("postHighScore fired");
    if (score > highScore) {
      setHighScore(score);
      await changeUser(account, user.username, user.imageHash, score);
    }
  }

  return (
    <Paper
      sx={{
        minHeight: "50vw",
      }}
    >
      <Grid container direction="column" className="sections">
        <Grid
          item
          className="topSpacer"
          sx={{
            height: "5vw",
            border: "1px solid black",
          }}
        />
        <Grid
          item
          container
          className="GameArea"
          sx={{ border: "1px solid black", minHeight: "30vw" }}
        >
          <Grid item xs={2}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={8} sx={{ border: "1px solid black" }}>
            <Game
              contracts={contracts}
              account={account}
              awardAmount={awardAmount}
              highScore={postHighScore}
              setScore={setScore}
            />
          </Grid>
          <Grid item xs={2}>
            <TokenAward highScore={highScore} rewardAmount={rewardAmount} />
          </Grid>
        </Grid>
        <Grid item className="footer" sx={{ border: "1px solid black" }}>
          Footer here
        </Grid>
      </Grid>
    </Paper>
  );
}

export default StartPage;
