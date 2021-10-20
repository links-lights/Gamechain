import OrbitDB from "orbit-db";
import ipfs from "../../ipfs";

const _db = (async () => {
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
      console.log("cool. new peer connected");
    });
  } catch (error) {
    console.error(error);
    db = await orbitdb.docs("orbit-users", options);
  }
  return db;
})();

export const fetchUsers = async () => {
  const db = await _db;
  await db.load();
  const users = db.get("");
  return users;
};
export const fetchUser = async (account) => {
  const db = await _db;
  await db.load();
  const user = await db.get(account);
  return user;
};
export const changeUser = async (account, username, imageHash, score) => {
  const db = await _db;
  await db.load();
  await db.put(
    {
      _id: account,
      username: username,
      imageHash: imageHash,
      score: score,
    },
    { pin: true }
  );
  const user = db.get(account);
  return user;
};
export const createUser = async (account, username, imageHash, score) => {
  const db = await _db;
  await db.load();
  await db.put(
    {
      _id: account,
      username: username,
      imageHash: imageHash,
      score: score,
    },
    { pin: true }
  );
  const user = db.get(account);
  return user;
};
