import { create } from "ipfs-core";

let ipfs = null;

export async function startIpfs() {
  if (ipfs) {
    console.log("IPFS already started");
  } else if (window.ipfs && window.ipfs.enable) {
    console.log("Found window.ipfs");
    ipfs = await window.ipfs.enable({ commands: ["id"] });
  } else {
    try {
      console.time("IPFS Started");
      ipfs = await create();
      console.timeEnd("IPFS Started");
    } catch (error) {
      console.error("IPFS init error:", error);
      ipfs = null;
    }
  }
}
