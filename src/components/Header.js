"use client"

import { useState } from "react"
import ApplicationForm from "./ApplicationForm"

const Header = () => {
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

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
        <div style={{ marginRight: "20px", display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "5px" }}>📞</span>
          <span>1234-567-890</span>
        </div>
        <button
          onClick={toggleForm}
          style={{
            backgroundColor: "#009933",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Apply Now
        </button>
      </div>

      {showForm && <ApplicationForm onClose={toggleForm} />}
    </header>
  )
}

export default Header
