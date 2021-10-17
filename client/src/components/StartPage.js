import React, { useState } from "react";
import Game, { highScore, rewardAmount } from "./Game";
import TokenAward from "./TokenAward";
import { Paper, Grid } from "@mui/material";
import RecipeReviewCard from "./GameDescripion";
import { changeUser, fetchUser, createUser } from "../db/models/user";

/* Current: I was able to successfully obtain tokens awarded by moving the functions
from the game component into the startPage, creating local state in Startpage then passing
to TokenAwards Component. The functions can still be found in the Game Component but they
are currently commented out. These functions are AwardAmount, highscore, SetReward.


Current blocker: I am currently unable to populate the Highscore on the startPage after game over. One thing I
noticed is that it would be a bit of work to pull out the scoring logic from out the game
into the Startpage. I was thinking maybe writing a function inside the child component to
extract out the score then have a way to pull that state score info into the parent so that
I can pass it out the score component. There could be a more effective solution though, wondering
if hooks could help with that?? Sorry I couldn't get more done guys..
*/

class StartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      highScore: 0,
      rewardAmount: 0,
      board: null,
      user: null,
    };
    this.highScore = this.highScore.bind(this);
    this.awardAmount = this.awardAmount.bind(this);
    this.setReward = this.setReward.bind(this);
    this.setBoard = this.setBoard.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  async componentDidMount() {
    const account = this.props.drizzleState.accounts[0];
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
    this.setState({ user: _user }, () => {
      this.setState({
        highScore: this.state.user.score,
      });
    });
  }

  //methods for score bind this
  async awardAmount(amount) {
    await this.setState({ rewardAmount: amount }, function () {
      console.log("reward", this.rewardAmount);
    });
  }

  setBoard(board) {
    this.setState({
      board: board,
    });
  }

  setScore(score) {
    this.setState({
      score,
    });
  }

  async highScore() {
    const account = this.props.drizzleState.accounts[0];
    console.log(this.state.user);
    if (this.state.score > this.state.highScore) {
      this.setState({ highScore: this.state.score });
      await changeUser(
        account,
        this.state.user.username,
        this.state.user.imageHash,
        this.state.score
      );
    }
  }

  async setReward() {
    let highestBoard = 0;
    const contract = this.props.drizzle.contracts.TZFEToken;
    const account = this.props.drizzleState.accounts[0];
    let amount = 0;
    this.state.board.forEach((row) => {
      highestBoard = Math.max(...row, highestBoard);
    });
    if (highestBoard >= 4) {
      amount++;
    }
    if (this.state.score >= 100) {
      amount++;
    }
    if (highestBoard >= 8) {
      amount++;
    }
    if (this.state.score >= 200) {
      amount++;
    }
    if (highestBoard >= 2048) {
      amount++;
    }
    if (this.state.score >= 20000) {
      amount++;
    }
    console.log("amount", amount);
    if (amount > 0) {
      await contract.methods.reward(account, amount).send({ from: account });
      //but why?
      // await this.awardAmount(amount);
      // I think we can do this insted - please correct me if I'm mistakern
      await this.awardAmount(amount + this.state.rewardAmount);
    }

    this.highScore();

    console.log(await contract.methods.balanceOf(account).call());
  }

  render() {
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
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
                awardAmount={this.awardAmount}
                highScore={this.highScore}
                setReward={this.setReward}
                setScore={this.setScore}
                setBoard={this.setBoard}
              />
            </Grid>
            <Grid item xs={2}>
              <TokenAward
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
                highScore={this.state.highScore}
                rewardAmount={this.state.rewardAmount}
              />
            </Grid>
          </Grid>
          <Grid item className="footer" sx={{ border: "1px solid black" }}>
            Footer here
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default StartPage;
