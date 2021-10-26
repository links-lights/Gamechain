import { useState, useEffect } from 'react';
import { changeUser } from "../db/models/user";
import { Box, TextField, Button, InputBase, Typography, Divider} from '@mui/material';

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
    <Box component="form" onSubmit={onSubmit}>
      <Typography variant="h6">
        Edit Account
      </Typography>
      <Divider />
      <br></br>
      <TextField label="Username" value={username} onChange={changeUserName} fullWidth />
      <br></br>
      <br></br>
      <Typography >Upload File(JPG, PNG, GIF)</Typography>
      <InputBase type="file" onChange={onChange} />
      <br></br>
      <br></br>
      <Button type="submit">Save Changes</Button>
      <Button onClick={()=>editToggle()}>Cancel</Button>
    </Box>

    // <form onSubmit={onSubmit}>
    //       <label>
    //         <h3>
    //           Username:
    //           <input value={username} onChange={changeUserName} />
    //         </h3>
    //       </label>
    //       <h2>Upload File (image is better, or gif)</h2>
    //       <input type="file" onChange={onChange} />
    //       <button type="submit" className="App-button">
    //         Save Changes
    //       </button>
    //     </form>
  )
}
export default EditAccount;
