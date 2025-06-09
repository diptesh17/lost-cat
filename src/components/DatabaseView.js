"use client"

import { useAuth } from "../context/AuthContext"

const DatabaseView = ({ onClose }) => {
  const { users } = useAuth()

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "1000px",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#333" }}>Registered Users Database</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#999",
            }}
          >
            &times;
          </button>
        </div>

        {users.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <p style={{ fontSize: "18px" }}>No users registered yet.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Username</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Email</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Gender</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Contact</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Address</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.id}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.username}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.email}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.gender}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.contact}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.address || "N/A"}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.registeredAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ color: "#666", fontSize: "14px" }}>Total Users: {users.length}</p>
        </div>
      </div>
    </div>
  )
}

export default DatabaseView
