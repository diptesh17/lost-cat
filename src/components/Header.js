"use client"
import { useAuth } from "../context/AuthContext"

const Header = ({ onShowDB }) => {
  const { isAuthenticated, currentUser, logout } = useAuth()

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#eee",
            marginRight: "10px",
            borderRadius: "4px",
          }}
        ></div>
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <span style={{ color: "#008000" }}>LOREM</span>
          <span style={{ color: "#FFA500" }}>IPSUM</span>
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px" }}>📞</span>
            <span>9766162144</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px" }}>📧</span>
            <span>diptesh.deore@accenture.com</span>
          </div>
        </div>

        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ marginRight: "10px", color: "#666" }}>Welcome, {currentUser?.username}!</span>
            <button
              onClick={onShowDB}
              style={{
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                marginRight: "10px",
              }}
            >
              DB
            </button>
            <button
              onClick={logout}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
