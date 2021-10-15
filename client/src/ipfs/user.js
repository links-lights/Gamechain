import ipfs from "../ipfs";

const User = async (account, username, imageHash, score) => {
  const _ipfs = await ipfs;
  const name = username ? username : account;
  const imageSrc = imageHash
    ? imageHash
    : "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe";

  const userData = JSON.stringify({
    username: name,
    imageHash: imageSrc,
    score,
  });

  await _ipfs.files.write(`/users/${account}.JSON`, userData, { create: true });
};

export const fetchUsers = async () => {
  const _ipfs = await ipfs;
  const users = [];
  for await (const file of _ipfs.files.ls(`/users/`)) {
    let chunks = [];
    for await (const chunk of _ipfs.files.read(`/users/${file.name}`)) {
      chunks.push(chunk);
    }
    let _user = JSON.parse(Buffer.from(...chunks).toString("utf8"));
    users.push(_user);
  }
  return await users;
};

export const setUser = async (account, highScore = 0) => {
  const _ipfs = await ipfs;
  const chunks = [];
  for await (const chunk of _ipfs.files.read(`/users/${account}.JSON`)) {
    chunks.push(chunk);
  }
  const _user = JSON.parse(Buffer.from(...chunks).toString("utf8"));
  await User(account, _user.username, _user.imageHash, highScore);
};

export default User;
