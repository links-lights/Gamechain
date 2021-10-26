import axios from "axios";
import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

import {
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Divider,
  CardHeader,
  Paper,
} from "@mui/material";

const Metadata = (props) => {
  //drizzle
  const drizzleState = drizzleReactHooks.useDrizzleState((drizzleState) => ({
    accounts: drizzleState.accounts,
  }));
  const drizzleInstance = drizzleReactHooks.useDrizzle();

  //state
  const contracts = drizzleInstance.drizzle.contracts;
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    (async () => {
      const nfts = new Array(5).fill(0);

      const path = `https://ipfs.io/ipfs/${await contracts.GameNFT.methods
        .uri(0)
        .call()}`;
      const _metadata = await Promise.all(
        nfts.map(async (num, ix) => {
          const newPath = path + `/${ix}.json`;
          const { data } = await axios.get(newPath);
          return data;
        })
      );
      setMetadata(_metadata);
    })();
  }, []);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap={1}
        p={1}
        sx={{
          minHeight: "45vw",
        }}
      >
        <h1>Collectibles</h1>
        <ul>
          {metadata.map((data) => {
            return (
              <Box className="TokenCard" gridColumn="">
                <Card>
                  <CardHeader title={data.name} subheader="Image" />
                  <CardMedia
                    component="img"
                    alt={data.name}
                    image={data.imageHash}
                  />
                </Card>
                <CardContent>
                  <Typography>Description</Typography>
                  <Divider />
                  <Typography p={2} textAlign="center">
                    {data.description}
                  </Typography>
                </CardContent>
              </Box>
            );
          })}
        </ul>
      </Box>
    </>
  );
};

export default Metadata;
