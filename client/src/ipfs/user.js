import ipfs from "../ipfs";

const User = async (account, username, imageHash, score) => {
  const name = username ? username : account;
  const imageSrc = imageHash
    ? imageHash
    : "QmXiYAbTQP4yMbjbNVJc4NyPskY88gwXqSoMPBPHrarGTe";
  const _ipfs = await ipfs;
  const userData = JSON.stringify({
    username: name,
    imageHash: imageSrc,
    score,
  });
  console.log(userData);

  await _ipfs.files.write(`/users/${account}.JSON`, userData, { create: true });
};

export default User;
