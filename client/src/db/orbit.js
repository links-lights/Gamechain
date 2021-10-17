const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");

async function Orbitdb() {
  const ipfs = await IPFS.create();
  return await OrbitDB.createInstance(ipfs);
}

async function _main(orbitdb) {
  const db = await orbitdb.docs("orbit.users");
  await db.put({ _id: 1, name: "Sanya" });
  console.log("hey", db.get(""));
  await db.close();
}

async function load(orbitdb) {
  const db = await orbitdb.docs("orbit.users");
  await db.load();
  console.log("you", db.get(""));
  await db.put({ _id: 1, name: "peter" });
  await db.put({ _id: 2, name: "james" });
  console.log("you", db.get(""));
  await db.close();
}

async function main() {
  const orbitdb = await Orbitdb();
  await _main(orbitdb);
  await load(orbitdb);
}

main();
