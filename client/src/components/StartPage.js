import React from "react";
import Game from './Game'
import { Paper, Grid } from "@mui/material"

class StartPage extends React.Component {

  //score
  //methods for score bind this
  render () {
    console.log(this.props)
    return (
      <Paper sx={{
        minHeight:"50vw"
      }}>
        <Grid container direction="column" className="sections">
          <Grid item
          className="topSpacer"
          sx={{
            height:"5vw",
            border:"1px solid black"
          }} />
          <Grid item container className="GameArea" sx={{border:"1px solid black", minHeight:"30vw"}}>
          <Grid item xs={2}>
          Description  here
          </Grid>
          <Grid item xs={8}
          sx={{border:"1px solid black"}}>
            <Game drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
          </Grid>
          <Grid item xs={2}>
            Score here
            </Grid>
          </Grid>
          <Grid item className="footer" sx={{border:"1px solid black"}}>
            Footer here
          </Grid>
        </Grid>
      </Paper>
    )
  }

}

export default StartPage;
