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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
//import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
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
            height: "83%", //`calc(50% - ${drawerBleeding}px)`,
            width: "16.6%", //`calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
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
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            Game Description
          </Typography>
          <Typography variant="body1" color="primary" align="center">
            {" "}
            This is a game that will cost you ether, but you can win tokens. You
            combine like-numbered tiles numbered with powers of two until you
            get a tile with the value of 2048. Gameplay consists of swiping the
            tiles up, right, down and left, and any tiles that match in the
            direction and adjacent spot will combine in the direction swiped.
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
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

export default SwipeableEdgeDrawer;
