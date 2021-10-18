const ipfsAPI = require("ipfs-http-client");
const { globSource } = require("ipfs-http-client");

const NFT = async () => {
  const ipfs = await ipfsAPI.create({
    host: "ipfs.infura.io",
    port: "5001",
    protocol: "https",
  });

  for await (const file of ipfs.addAll(
    globSource("../erc1155metadata/", "**/*", { recursive: true }),
    { wrapWithDirectory: true }
  )) {
    console.log(file);
  }
};

NFT();
