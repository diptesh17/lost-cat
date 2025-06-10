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
          width: "95%",
          maxWidth: "1200px",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "#333", fontSize: "24px" }}>📊 Registered Users Database</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              cursor: "pointer",
              color: "#999",
              padding: "5px",
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          <p style={{ margin: 0, color: "#666", fontSize: "16px" }}>
            <strong>Total Registered Users: {users.length}</strong>
          </p>
        </div>

        {users.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#666" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>👥</div>
            <h3 style={{ color: "#999", marginBottom: "10px" }}>No Users Registered Yet</h3>
            <p style={{ fontSize: "16px" }}>Register new users to see them appear in this database table.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
                  <th style={{ padding: "15px 12px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>ID</th>
                  <th style={{ padding: "15px 12px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
                    Username
                  </th>
                  <th style={{ padding: "15px 12px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
                    Email
                  </th>
                  <th style={{ padding: "15px 12px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
                    Gender
                  </th>
                  <th style={{ padding: "15px 12px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
                    Contact
                  </th>
                  <th style={{ padding: "15px 12px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
                    Address
                  </th>
                  <th style={{ padding: "15px 12px", textAlign: "left", fontWeight: "bold", fontSize: "14px" }}>
                    Registered At
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td style={{ padding: "12px", fontSize: "14px", color: "#333" }}>{user.id}</td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#333", fontWeight: "bold" }}>
                      {user.username}
                    </td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#666" }}>{user.email}</td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#666", textTransform: "capitalize" }}>
                      {user.gender}
                    </td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#666" }}>{user.contact}</td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#666", maxWidth: "150px" }}>
                      {user.address}
                    </td>
                    <td style={{ padding: "12px", fontSize: "14px", color: "#666" }}>{user.registeredAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            padding: "15px",
            backgroundColor: "#f0f8f0",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: 0, color: "#4CAF50", fontSize: "14px", fontWeight: "bold" }}>
            ✅ Database is live and updating in real-time
          </p>
        </div>
      </div>
    </div>
  )
}

export default DatabaseView
