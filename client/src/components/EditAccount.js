import { useState, useEffect } from 'react';
import { fetchUser, changeUser, createUser } from "../db/models/user";

const EditAccount = (props) => {

  const {user, _ipfs, account, setUser, editToggle} =  props;
  console.log(user)
  const [buffer, setBuffer] = useState(null);
  const [username, setUsername] = useState('');
  console.log(username)


  useEffect(()=>{
    if(user.username.length > 0){
      setUsername(user.username)
    } else setUsername(user._id)
  }, [])

  const changeUserName = (event) => {
    setUsername(event.target.value)
  }
  const onChange = async (event) => {
    const _file = event.target.files[0];
    //   //* Strange thing - We need to read about it later on
    const reader = new window.FileReader();
    //   //* Also strang

    reader.readAsArrayBuffer(_file);
    reader.onloadend = () => {
      //     //* Buffer - thing from node!
      //     //* We can read about it later
      //     //* Ipfs can eat only that type of information
      setBuffer(Buffer(reader.result));
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    //* ipfs api
    let hash, _user;
    if (buffer) {
      hash = await _ipfs.add(buffer);
      _user = (
        await changeUser(
          account,
          username,
          hash.cid.toString(),
          user.score
        )
      )[0];
    } else {
      _user = (
        await changeUser(account, username, user.imageHash, user.score)
      )[0];
    }
    editToggle()
    setUser(_user);
  };

  return(
    <form onSubmit={onSubmit}>
          <label>
            <h3>
              Username:
              <input value={username} onChange={changeUserName} />
            </h3>
          </label>
          <h2>Upload File (image is better, or gif)</h2>
          <input type="file" onChange={onChange} />
          <button type="submit" className="App-button">
            Save Changes
          </button>
        </form>
  )
}
export default EditAccount;
