import React from "react";
import { Link } from "react-router-dom";
import { Box, Toolbar, Button, AppBar, Typography } from "@mui/material";

import "../styles/Navbar.css";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#BD431D" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 10 }}
              className="link"
            >
              <Link to="/"> Home</Link>
            </Typography>
            <Button variant="outlined">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="link"
              >
                <Link to="/game"> Training</Link>
              </Typography>
            </Button>
            <Button variant="outlined">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="link"
              >
                <Link to="/start"> Game</Link>
              </Typography>
            </Button>
            <Button variant="outlined">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="link"
              >
                <Link to="/"> My Account</Link>
              </Typography>
            </Button>
            <Button variant="outlined">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className="link"
              >
                <Link to="/scoreboard"> ScoreBoard</Link>
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
