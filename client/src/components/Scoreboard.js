import { fetchUsers } from "../ipfs/user";
import React, { useState, useEffect } from "react";

const Scoreboard = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const _users = await fetchUsers();
      _users.sort((user1, user2) => {
        return user2.score - user1.score;
      });
      setUsers(_users);
    })();
  }, []);

  return (
    <>
      <h1>Scoreboard</h1>
      <table>
        <tbody>
          <tr>
            <th>
              <h3>Username</h3>
            </th>
            <th>
              <h3>High Score</h3>
            </th>
          </tr>
          {users.map((user, key) => {
            return (
              <tr key={key}>
                <th>{user.username}</th>
                <th>{user.score}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Scoreboard;
