import React, { useState, useEffect } from "react";
import { Box, Toolbar, Button, AppBar, Typography, Divider, Grid } from "@mui/material";

const TokenAward = (props) => {
  // const [state, setState] = useState(props);
  // console.log('insideTokenAward', state)
  // useEffect( () => {
  //     setState(props)},[props])
  return (
    <Grid container
    alignContent="center"
    justifyContent="center"
    sx={{
      minHeight:"25vw",
    }}>
        <Grid item xs={12}
        p={5}
        sx={{
          minHeight:"8vw",
          textAlign:"center"
          }}>
            <Typography variant="h4">
            Highest Score
            </Typography>
            <Divider />
            <Typography variant="h5" color="blue" p={1}>
            {props.highScore}
            </Typography>
        </Grid>
        <Divider></Divider>
        <Grid item xs={12}
        p={5}
        sx={{
          minHeight:"8vw",
          textAlign:"center"
          }}>
            <Typography variant="h4">
            Tokens won
            </Typography>
            <Divider />
            <Typography variant="h5" color="green" p={1}>
            {props.rewardAmount}
            </Typography>
        </Grid>
    </Grid>
  );
};

export default TokenAward
