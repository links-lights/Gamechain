import { Box, Divider, Typography } from '@mui/material';

const LandingPage = () => {

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={5} p={3}>
      <Box className="Title" gridColumn="span 12">
        <Typography variant="h4">
          BlogChain
        </Typography>
      </Box>
      <Box className="Token" gridColumn="span 6">
        Token here
      </Box>
      <Box className="Introduction" gridColumb="span 6">
        <Typography variant="h6">
          Welcome!
        </Typography>
        <Divider />
        <Typography variant="body1">
        GameChain is a DApp built by Fullstack Academy seniors who were looking to built a fully decentralized application using BlockChain technology.
        <br></br><br></br>
        We leveraged great technology like React, Truffle suite, and IPFS to bring you this DApp. Learn more in our ReadMe.
        <br></br><br></br>
        Head to the account page to personalize your default account or click How-To to learn about the game and setup your wallet to play on our scoreboard!
        </Typography>
      </Box>
    </Box>
  )
}

export default LandingPage;
