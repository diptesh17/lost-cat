const Navigation = () => {
  return (
    <nav
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 20px",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "40px",
          }}
        >
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#666", fontSize: "14px" }}>
              LINK 1
            </a>
          </li>
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#666", fontSize: "14px" }}>
              LINK 2
            </a>
          </li>
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#666", fontSize: "14px" }}>
              LINK 3
            </a>
          </li>
          <li>
            <a href="#" style={{ textDecoration: "none", color: "#666", fontSize: "14px" }}>
              LINK 4
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
