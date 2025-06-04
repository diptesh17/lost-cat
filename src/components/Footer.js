const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        color: "white",
        padding: "20px 0",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: "14px" }}>Copyright @2015. All right reserved</p>
        </div>
        <div>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              margin: 0,
              padding: 0,
              gap: "20px",
            }}
          >
            <li>
              <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
                Link 1
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
                Link 2
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
                Link 3
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "white", textDecoration: "none", fontSize: "14px" }}>
                Link 4
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
