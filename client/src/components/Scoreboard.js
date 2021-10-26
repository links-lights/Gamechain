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
  const top5 = users.filter((user, idx)=>idx < 5 && user.score > 0)
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
        <Grid item xs={5} >
          All High Scores
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

                <TableCell>
                  Username
                </TableCell>
                <TableCell align="right">
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {users.map((user, key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th">{key + 6}</TableCell>
                <TableCell>{`${user.username.slice(0, 10)}... `}</TableCell>
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

    // <>
    //   <h1>Scoreboard</h1>
    //   <table>
    //     <tbody>
    //       <tr>
    //         <th></th>
    //         <th></th>
    //         <th>
    //           <h3>Username</h3>
    //         </th>
    //         <th>
    //           <h3>High Score</h3>
    //         </th>
    //       </tr>
          // {users.map((user, key) => {
          //   return (
          //     <tr key={key}>
          //       <th>{key + 1}</th>
          //       <th>
          //         <img
          //           src={`https://ipfs.io/ipfs/${user.imageHash}`}
          //           alt="user pfp"
          //           className="scoreboard-pic"
          //         />
          //       </th>
          //       <th>{user.username}</th>
          //       <th>{user.score}</th>
          //     </tr>
          //   );
          // })}
    //     </tbody>
    //   </table>
    // </>
  );
};

export default Scoreboard;
