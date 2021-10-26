import { Box, Divider, Typography, Paper } from "@mui/material";
import BigSpinningCoin from "./BigSpinningCoin";

const LandingPage = () => {
  return (
    <Box
      component={Paper}
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      p={3}
      sx={{
        minHeight: "45vw",
      }}
    >
      <Box
        className="Title"
        gridColumn="span 12"
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h2">GameChain</Typography>
      </Box>
      <Box className="Token" gridColumn="span 6">
        <BigSpinningCoin />
      </Box>
      <Box
        className="Introduction"
        gridColumn="span 6"
        p={3}
        sx={{
          minHeight: "35vw",
          backgroundColor: "#CCCCCC",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6">Welcome!</Typography>
        <Divider />
        <Typography variant="body1">
          GameChain is a DApp built by Fullstack Academy seniors who were
          looking to built a fully decentralized application using BlockChain
          technology.
          <br></br>
          <br></br>
          We leveraged great technology like React, Truffle suite, and IPFS to
          bring you this DApp. Learn more in our ReadMe.
          <br></br>
          <br></br>
          Our Goal was to show upcoming developers that there is an alternative
          to centralized architecture. Building fully or even partially with
          decentralized or distributed platforms and tech can be exciting and
          truly empower the communities that care about the work. BlockChain
          technology can really innovate the way we think about our schema
          design and storage. This was a first step for our team using
          BlockChain technology and we are excited to continue expanding and
          paving the way forward using decentralized architecture. Read more
          about us here.
          <br></br>
          <br></br>
          Head to the account page to personalize your default account or click
          How-To to learn about the game and setup your wallet to play on our
          scoreboard.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
