import { useEffect, useState } from "react";
import "./UserTable.css";

const DEFAULT_ROWS_PER_PAGE = 10;

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortParams, setSortParams] = useState({
    columnKey: null,
    direction: "asc",
  });
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    fetch(`https://hiring-api.simbuka.workers.dev/?size=${rowsPerPage}`)
      .then((response) => response.json())
      .then(setUsers)
      .catch((error) => console.error("Error fetching data:", error));
  }, [rowsPerPage]);

  const handleRowCountChange = (event) => {
    setRowsPerPage(Number(event.target.value));
  };

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
    <div>
      <div className="rowCountSelector">
        <label htmlFor="rowsPerPage">Rows per page:</label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={handleRowCountChange}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

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
    </div>
  );
};
