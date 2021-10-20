import ipfs from "../ipfs";
import OrbitDB from "orbit-db";

export default (async function Orbitdb() {
  const _ipfs = await ipfs;
  const orbitdb = await OrbitDB.createInstance(_ipfs);
  const options = {
    create: true,
    accessController: {
      write: ["*"],
    },
  };

  const db = await orbitdb.docs("orbit-users", options);
  console.log(db.address.toString());
  db.events.on("replicated", () => {
    const result = db
      .iterator({ limit: -1 })
      .collect()
      .map((e) => e.payload.value);
    console.log(result.join("\n"));
  });

  return db;
})();
