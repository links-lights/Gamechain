import { fetchUsers } from "../db/models/user";
import React, { useState, useEffect } from "react";

import "../styles/Scoreboard.css";
import { Paper, Box, Typography, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid} from "@mui/material";

const Scoreboard = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const _users = await fetchUsers();
      _users.sort((user1, user2) => {
        return user2.score - user1.score;
      });
      setUsers(_users);
    })();
  }, []);
  const top5 = users.filter((user, idx)=>idx < 5)
  const scores = users.filter((user, idx)=> idx >= 5)
  return (
    <Box gridTemplateColumns="repeat(12, 1fr)" p={4}  gap={2}
    sx={{
      minHeight:"48vw"
    }}>
      <Box className="title"  gridColumn="span 12"
      sx={{
        textAlign:"center"
      }}>
        <Typography variant="h3">
          ScoreBoard
          <br></br>
        </Typography>
          <Divider />
      </Box>
      <Grid container p={4} spacing={8}>
      <Grid item className="scoreboard" xs={7}>
        <Typography variant="h4" textAlign="center">
          Top 5
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Rank
                </TableCell>
                <TableCell>
                  {``}
                  </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell align="right">
                  HighScore
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {top5.map((user, key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th">{key + 1}</TableCell>
                <TableCell>
                  <img
                    src={`https://ipfs.io/ipfs/${user.imageHash}`}
                    alt="user pfp"
                    className="scoreboard-pic"
                  />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell align="right">{user.score}</TableCell>
              </TableRow>
            );
          })}

            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
        <Grid item container xs={5} alignContent="center" justifyContent="center">
          <Typography variant="body1">
          All High Scores
          </Typography>
          <br></br>
          <br></br>
        <TableContainer component={Paper}
         sx={{
          maxWidth:400
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  #
                </TableCell>

                <TableCell align="center">
                  Username
                </TableCell>
                <TableCell align="right">
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {scores.map((user, key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th">{key + 6}</TableCell>
                <TableCell align="center">{`${user.username.slice(0, 10)}... `}</TableCell>
                <TableCell align="right">{user.score}</TableCell>
              </TableRow>
            );
          })}

            </TableBody>
          </Table>
        </TableContainer>

        </Grid>
      </Grid>
    </Box>
  );
};

export default Scoreboard;
