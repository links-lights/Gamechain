import React from "react";
import { Link } from "react-router-dom";
import { Box, Toolbar, Button, AppBar, Typography } from "@mui/material";

import "../styles/Navbar.css";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 10 }}>
              <Link to="/"> Home</Link>
            </Typography>
            <Button variant="outlined">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/game"> Game</Link>
              </Typography>
            </Button>
            <Button variant="outlined">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/"> My Account</Link>
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
