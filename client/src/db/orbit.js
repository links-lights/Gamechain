import ipfs from "../ipfs";
import OrbitDB from "orbit-db";
import Identities from "orbit-db-identity-provider";

async function Orbitdb() {
  const _ipfs = await ipfs;
  const options = { id: "local-id" };
  const identity = await Identities.createIdentity(options);
  return await OrbitDB.createInstance(_ipfs, { identity: identity });
}

export default Orbitdb();
