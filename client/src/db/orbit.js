import ipfs from "../ipfs";
import OrbitDB from "orbit-db";

async function Orbitdb() {
  const _ipfs = await ipfs;
  return await OrbitDB.createInstance(_ipfs);
}

export default Orbitdb();
