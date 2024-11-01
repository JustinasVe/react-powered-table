import { useEffect, useState } from "react";
import "./UserTable.css";

export const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://hiring-api.simbuka.workers.dev")
      .then((response) => response.json())
      .then(setUsers);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
