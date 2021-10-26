import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import gameGif from '../images/2048.gif'
import arrowKeys from '../images/arrowKeys.png'
import { Box, Button, Typography, Divider, Link, Paper} from "@mui/material"
import NFTOddsTable from "./NFTOddsTable";
import TokenOddsTable from "./TokenOdds";

const drawerBleeding = 0;

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

function DescriptionDrawer(props) {
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

        <Button onClick={toggleDrawer(true)}
        sx={{
          color:"white",
        }}
        variant="">
          <Typography
          variant="h6"
          sx={{

          }}>
            How-To-Play
            </Typography>
          </Button>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,
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
          <Paper sx={{ minHeight:"10vw"}} p={4} display="grid">
            <Box p={4}>
            <Typography variant="h6">Welcome to GameChain:2048. </Typography>
          <Typography variant="body1">
            In order to start the game you will need an ethereum wallet. You will need ether in your wallet to pay <Link href="https://ethereum.org/en/developers/docs/gas/" underline="hover">gas fees</Link> and receive TZFETokens.
            <br></br><br></br>
            We are currently in Beta Testing. Our smart contract is deployed on <Link src="https://ethereum.org/en/developers/docs/networks/#ropsten" underline="hover">Ropsten</Link>. Please follow these steps in order to play and place on the scoreboard.
            <ol>
              <li>Have <Link href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" underline="hover">MetaMask</Link> installed. Setup your account and wallet.</li>
              <li>Click on Networks in MetaMask, center top button, and choose Ropsten Test Network.</li>
              <li>Get free test ethereum by copy/pasting your address into form on <Link href="https://faucet.ropsten.be/" underline="hover">Ropsten faucet</Link> and clicking 'Send me Test Ether.' Transaction may take a moment, multiple requests will gray-list you. </li>
              <li>Reload webPage and accept connection to MetaMask with your account on Ropsten Network.</li>
              <li>Enjoy Game! See below how to play.</li>
            </ol>
          </Typography>
          {/* <Box gridColumn="span 5">
            <iframe title="add test ether" src="https://youtube.com/embed/rSL3kP13gOI" height="100%" width="100%"></iframe>
          </Box> */}
          </Box>
          </Paper>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5} p={4}>
            <Box gridColumn="span 6" p={4}>
              <NFTOddsTable />
            </Box>
            <Box gridColumn="span 6" p={4}>
              <TokenOddsTable />
            </Box>
            <Box className="controlKeys" gridColumn="span 4">
              <img alt="Controls" src={arrowKeys} height="100%" width="100%" />
            </Box>
            <Box className="controlKeys" gridColumn="span 8">
              <Typography variant="h4" className="controls" p={1} textAlign="center" fontWeight="bold">Use Keyboard to Move Blocks</Typography>
              <Divider />
              <Typography variant="h5" p={1} textAlign="center">
                Up, Down, Left, Right Arrow Keys
                <br></br><br></br>
                -or-
                <br></br><br></br>
                W(Up), A(Left), S(Down), D(Right)

              </Typography>
            </Box>
          </Box>
          <Divider />

        <Typography variant="h4" className="GamePlay" p={1}>
            How To Play
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
              <img alt="gameGif" src={gameGif} height="auto" width="100%" />

              <Typography sx={{ fontSize:"12px", alignSelf:"flex-end"}}>
              <Link href="https://gfycat.com/ifr/ElegantSaneKingbird" underline="hover">Gif:Source</Link>
              </Typography>

            </Box>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

export default DescriptionDrawer;

//https://www.youtube.com/watch?v=NGL-bxK1C2s&ab_channel=RoshdiSakallah video to embed
