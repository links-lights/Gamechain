import * as IPFS from "ipfs";

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
};

const ipfs = IPFS.create(ipfsOptions);

// {
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// }
export default ipfs;
