import axios from "axios";
import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";

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
      <h1>Metadata:</h1>
      <ul>
        {metadata.map((data) => {
          return (
            <li>
              <h2>{data.name}</h2>
              <img src={data.imageHash} alt={`${data.name} pic`} />
              <h4>{data.description}</h4>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Metadata;
