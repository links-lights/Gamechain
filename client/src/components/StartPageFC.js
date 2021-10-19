import React, { useState, useEffect } from "react";
import Game, { highScore, rewardAmount } from "./Game";
import TokenAward from "./TokenAward";
import { Paper, Grid } from "@mui/material";
import RecipeReviewCard from "./GameDescripion";
import { changeUser, fetchUser, createUser } from "../db/models/user";

function StartPage (props) {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [rewardAmount, setRewardAmount] = useState(0);
    const [board, setBoard] = useState([]);
    const [user, setUser] = useState({});
    const account = props.drizzleState.accounts[0];


    useEffect(()=> {
        (async () => {
        let _user = (await fetchUser(account))[0];
        if (!_user) {
          _user = (
            await createUser(
              account,
              account,
              "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe",
              0
            )
          )[0];
        }
        setUser(_user)
        setHighScore(_user.score);
        console.log('render', highScore, score, board, rewardAmount )
    })()}
    ,[highScore, account, score, board, rewardAmount])

    async function awardAmount(amount) {
        await setRewardAmount(amount);
      }

    async function postHighScore() {
      console.log('postHighScore fired')
        if (score > highScore) {
          setHighScore(score);
          await changeUser(
            account,
            user.username,
            user.imageHash,
            score
          );
        }
      }

      async function setReward() {
        console.log('setReward Fired')
        let highestBoard = 0;
        const contract = props.drizzle.contracts.TZFEToken;
        let amount = 0;
        //console.log('board', board)
        board.forEach((row) => {
          highestBoard = Math.max(...row, highestBoard);
        });
        if (highestBoard >= 4) {
          amount++;
        }
        if (score >= 100) {
          amount++;
        }
        if (highestBoard >= 8) {
          amount++;
        }
        if (score >= 200) {
          amount++;
        }
        if (highestBoard >= 2048) {
          amount++;
        }
        if (score >= 20000) {
          amount++;
        }
        if (amount > 0) {
          await contract.methods.reward(account, amount).send({ from: account });
          //but why?
          // await this.awardAmount(amount);
          // I think we can do this insted - please correct me if I'm mistakern
          // await awardAmount(amount + rewardAmount);
          const newReward = amount + rewardAmount
          console.log(newReward)
          setReward(newReward)
        }
        console.log('amount in setreward', amount)
        postHighScore();

        console.log('This', await contract.methods.balanceOf(account).call());
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
                drizzle={props.drizzle}
                drizzleState={props.drizzleState}
                awardAmount={awardAmount}
                highScore={postHighScore}
                setReward={setReward}
                setScore={setScore}
                setBoard={setBoard}
              />
            </Grid>
            <Grid item xs={2}>
              <TokenAward
                drizzle={props.drizzle}
                drizzleState={props.drizzleState}
                highScore={highScore}
                rewardAmount={rewardAmount}
              />
            </Grid>
          </Grid>
          <Grid item className="footer" sx={{ border: "1px solid black" }}>
            Footer here
          </Grid>
        </Grid>
      </Paper>
    )
}

export default StartPage
