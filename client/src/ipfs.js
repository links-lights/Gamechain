const IPFS = require("ipfs-core");
const ipfs = IPFS.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default ipfs;
