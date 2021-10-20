import React, { useState, useEffect } from "react";
import { Box, Toolbar, Button, AppBar, Typography, Divider, Grid } from "@mui/material";

const TokenAward = (props) => {
  // const [state, setState] = useState(props);
  // console.log('insideTokenAward', state)
  // useEffect( () => {
  //     setState(props)},[props])
  return (
    <div className="TokenAward">
        <Box item xs={12} sx={{border:"1px solid black"}}>
            High Score: {props.highScore}
        </Box>
        <Divider></Divider>
        <Box item xs={12} sx={{border:"1px solid black"}}>
            Tokens Awarded: {props.rewardAmount}
        </Box>
    </div>
  );
};

export default TokenAward
