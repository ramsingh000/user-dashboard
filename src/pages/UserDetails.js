import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const data = await getUsers();
    const selectedUser = data.find((u) => u.id === parseInt(id));
    setUser(selectedUser);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "8px 12px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ⬅ Back
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ color: "#2c3e50" }}>User Details</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Username:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Website:</b> {user.website}</p>

        <h3>Address</h3>
        <p>{user.address.street}, {user.address.city}</p>

        <h3>Company</h3>
        <p>{user.company.name}</p>
      </div>
    </div>
  );
}

export default UserDetails;