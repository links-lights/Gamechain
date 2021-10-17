import _orbitdb from "../orbit";

export const fetchUsers = async () => {
  const orbitdb = await _orbitdb;
  const db = await orbitdb.docs("orbit.users");
  await db.load();
  const users = db.get("");
  await db.close();
  return users;
};
export const fetchUser = async (account) => {
  const orbitdb = await _orbitdb;
  const db = await orbitdb.docs("orbit.users");
  await db.load();
  const user = await db.get(account);
  // if (user.length === 0) {
  //   throw new Error();
  // }
  await db.close();
  return user;
};
export const changeUser = async (account, username, imageHash, score) => {
  const orbitdb = await _orbitdb;
  const db = await orbitdb.docs("orbit.users");
  await db.load();
  await db.put({
    _id: account,
    username: username,
    imageHash: imageHash,
    score: score,
  });
  return db.get(account);
};
export const createUser = async (account, username, imageHash, score) => {
  const orbitdb = await _orbitdb;
  const db = await orbitdb.docs("orbit.users");
  await db.load();
  await db.put({
    _id: account,
    username: username,
    imageHash: imageHash,
    score: score,
  });
  return db.get(account);
};
