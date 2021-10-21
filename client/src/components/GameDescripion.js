// import React from "react";
// import { Typography } from "@mui/material";

// const GameDescription = () => {

//   return (
//     <div>
//       <Typography variant='body1' color='primary' align='center'>
//        This is a game that will cost you ether, but you can win tokens. You combine like-numbered tiles numbered with powers of two until you get a tile with the value of 2048. Gameplay consists of swiping the tiles up, right, down and left, and any tiles that match in the direction and adjacent spot will combine in the direction swiped.

//       </Typography>
//     </div>
//   );
// };

// export default GameDescription;

import * as React from "react";
//import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
//import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
//import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import gameGif from '../images/2048.gif'
import { Box, Button, Typography, Divider, Link} from "@mui/material"
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';


const drawerBleeding = 56;

// const Root = styled("div")(({ theme }) => ({
//   height: "100%",
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? grey[100]
//       : theme.palette.background.default,
// }));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Handle = styled(Box)(({ theme }) => ({
  width: 80,
  height: 4,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 40px)",
}));

function SwipeableEdgeDrawer(props) {
  // const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  return (
    <>
      {/* <CssBaseline /> */}
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: "80%", //`calc(50% - ${drawerBleeding}px)`,
            width: "100%", //`calc(50% - ${drawerBleeding}px)`,
            overflow: "scroll",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Game Description</Button>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "static",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            border: "1px solid black"
          }}
        >
          <Handle />
          <Typography className="Title" variant="h3" sx={{ p: 2, color: "text.secondary",  textAlign:"center"}}>
            2048
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Typography variant="h4" className="controls" p={1}>Controls</Typography>
          <Divider />
          <Typography variant="body1" color="primary" align="center">
            Game Description

            This is a game that will cost you ether, but you can win tokens. You
            combine like-numbered tiles numbered with powers of two until you
            get a tile with the value of 2048. Gameplay consists of swiping the
            tiles up, right, down and left, and any tiles that match in the
            direction and adjacent spot will combine in the direction swiped.
          </Typography>
        <Typography variant="h4" className="GamePlay" p={1}>
            GamePlay
          </Typography>
        <Typography sx={{fontSize: "12px"}}><Link href="https://en.wikipedia.org/wiki/2048_(video_game)" underline="hover">Source: Wikipedia: 2048 Game</Link></Typography>
          <Divider />
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5} p={4 }>
            <Box className="howToPlay" gridColumn="span 9">
            <Typography variant="body1">
            2048 is played on a plain 4×4 grid, with numbered tiles that slide when a player moves them using the four arrow keys. Every turn, a new tile randomly appears in an empty spot on the board with a value of either 2 or 4. Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move. Higher-scoring tiles emit a soft glow; the highest possible tile is 131,072.
            <br></br><br></br>
            If a move causes three consecutive tiles of the same value to slide together, only the two tiles farthest along the direction of motion will combine. If all four spaces in a row or column are filled with tiles of the same value, a move parallel to that row/column will combine the first two and last two. A scoreboard on the upper-right keeps track of the user's score. The user's score starts at zero, and is increased whenever two tiles combine, by the value of the new tile.
            <br></br><br></br>
            The game is won when a tile with a value of 2048 appears on the board. Players can continue beyond that to reach higher scores. When the player has no legal moves (there are no empty spaces and no adjacent tiles with the same value), the game ends.
            </Typography>
            </Box>
            <Box className="2048gif" gridColumn="span 3">
              <img alt="gameGif" src={gameGif} height="100%" width="100%" />

              <Typography sx={{ fontSize:"12px", alignSelf:"flex-end"}}>
              <Link href="https://gfycat.com/ifr/ElegantSaneKingbird" underline="hover">Gif:Source</Link>
              </Typography>

            </Box>
          </Box>
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

export default SwipeableEdgeDrawer;

//https://www.youtube.com/watch?v=NGL-bxK1C2s&ab_channel=RoshdiSakallah video to embed
