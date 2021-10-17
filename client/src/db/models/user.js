import _orbitdb from "../orbit";

async function createDB() {
  const orbitdb = await _orbitdb;
  const options = {
    create: true,
    accessController: {
      write: ["*"],
    },
  };
  const db = await orbitdb.docs("orbit.users", options);
  return db.address.toString();
}

export const fetchUsers = async () => {
  const orbitdb = await _orbitdb;
  const address = await createDB();
  const db = await orbitdb.open(address);
  await db.load();
  const users = db.get("");
  await db.close();
  return users;
};
export const fetchUser = async (account) => {
  const orbitdb = await _orbitdb;
  const address = await createDB();
  const db = await orbitdb.open(address);
  await db.load();
  const user = await db.get(account);
  await db.close();
  return user;
};
export const changeUser = async (account, username, imageHash, score) => {
  const orbitdb = await _orbitdb;
  const address = await createDB();
  const db = await orbitdb.open(address);
  await db.load();
  await db.put({
    _id: account,
    username: username,
    imageHash: imageHash,
    score: score,
  });
  const user = db.get(account);
  await db.close();
  return user;
};
export const createUser = async (account, username, imageHash, score) => {
  const orbitdb = await _orbitdb;
  const address = await createDB();
  const db = await orbitdb.open(address);
  await db.load();
  await db.put({
    _id: account,
    username: username,
    imageHash: imageHash,
    score: score,
  });
  const user = db.get(account);
  await db.close();
  return user;
};
