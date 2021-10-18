import * as IPFS from "ipfs";

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
};

const ipfs = IPFS.create(ipfsOptions);

export default ipfs;
