import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h2 style={{ color: "#2c3e50" }}>User Dashboard</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginRight: "10px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <select
        onChange={(e) => setSortOrder(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      >
        <option value="asc">Sort Asc</option>
        <option value="desc">Sort Desc</option>
      </select>

      <br /><br />

      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            backgroundColor: "#ffffff"
          }}
        >
          <thead style={{ backgroundColor: "#3498db", color: "white" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => navigate(`/user/${user.id}`)}
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;