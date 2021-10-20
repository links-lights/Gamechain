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
  let db;
  try {
    console.log("hell yeah");
    db = await orbitdb.docs(
      "/orbitdb/zdpuAryTMHxhHjXtJ7hzkit1jMGXS21rLD2mSeo7PFJQEkaNF/orbit-users"
    );
    console.log(db.address.toString());
    db.events.on("replicated", () => {
      const result = db
        .iterator({ limit: -1 })
        .collect()
        .map((e) => e.payload.value);
      console.log(result.join("\n"));
    });
  } catch (error) {
    console.error(error);
    db = await orbitdb.docs("orbit-users", options);
    console.log("NO", db.address.toString());
  }

  return db;
})();
