import { useEffect, useState } from "react";
import "./UserTable.css";

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortParams, setSortParams] = useState({
    columnKey: null,
    direction: "asc",
  });

  useEffect(() => {
    fetch("https://hiring-api.simbuka.workers.dev")
      .then((response) => response.json())
      .then(setUsers);
  }, []);

  // Function to handle sorting

  const sortedUsers = () =>
    [...users].sort((a, b) => {
      if (sortParams.columnKey) {
        const aValue = a[sortParams.columnKey];
        const bValue = b[sortParams.columnKey];
        if (aValue > bValue) {
          return sortParams.direction === "asc" ? 1 : -1;
        }
        if (aValue < bValue) {
          return sortParams.direction === "asc" ? -1 : 1;
        }
      }
    });

  // Function to request a sort for a particular column

  const toggleSortOrder = (key) => {
    let direction = "asc";
    if (sortParams.columnKey === key && sortParams.direction === "asc") {
      direction = "desc";
    }
    setSortParams({ columnKey: key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => toggleSortOrder("firstName")}>
            First name
            {sortParams.columnKey === "firstName"
              ? sortParams.direction === "asc"
                ? " ↑"
                : " ↓"
              : ""}
          </th>
          <th onClick={() => toggleSortOrder("lastName")}>
            Last name
            {sortParams.columnKey === "lastName"
              ? sortParams.direction === "asc"
                ? " ↑"
                : " ↓"
              : ""}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers(users).map((user, index) => (
          <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
