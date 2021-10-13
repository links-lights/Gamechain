import React, { useState, useEffect } from "react";
import { Box, Toolbar, Button, AppBar, Typography, Divider, Grid } from "@mui/material";

const TokenAward = (props) => {
  const [state, setState] = useState(props);

  useEffect( () => {
      setState(props)},[props])
  return (
    <div className="TokenAward">
        <Box item xs={12} sx={{border:"1px solid black"}}>
            High Score: {state.highScore} 
        </Box>
        <Divider></Divider>
        <Box item xs={12} sx={{border:"1px solid black"}}>
            Tokens Awarded: {state.rewardAmount} 
        </Box>
    </div>
  );
};

export default TokenAward