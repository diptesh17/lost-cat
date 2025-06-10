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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          transition: "opacity 0.2s ease",
        }}
        onClick={() => (window.location.href = "http://localhost:3000")}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        title="Go to Homepage"
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#A100FF",
            marginRight: "15px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "24px",
              height: "24px",
              borderRight: "3px solid white",
              borderTop: "3px solid white",
              transform: "rotate(45deg)",
              marginLeft: "-3px",
            }}
          ></div>
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          <span style={{ color: "#A100FF" }}>ACCENTURE</span>
          <span style={{ color: "#000000" }}>TECH</span>
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
