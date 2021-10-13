import React from "react";
//import "../styles/Footer.css";

// const Footer = (props) => {
//   return (
//     <div className="footer">
//       <h2 className="item">
//         <a href="https://github.com/links-lights/Gamechain/projects/1">
//           <i className="fa fa-github" aria-hidden="true"></i>
//         </a>
//       </h2>
//       <h2 className="item">
//         <a href="https://github.com/links-lights/Gamechain/projects/1">
//           Game Source Code
//         </a>
//       </h2>
//     </div>
//   );
// };

//export default Footer;

import { Container, Grid, Box, Link } from "@mui/material";

export default function Footer(props) {
  return (
    <footer>
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Link
                  href="https://github.com/links-lights/Gamechain/projects/1"
                  color="inherit"
                >
                  <i className="fa fa-github" aria-hidden="true"></i>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Link
                  href="https://github.com/links-lights/Gamechain/projects/1"
                  color="inherit"
                >
                  Game Source Code
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
