"use client"

const Footer = ({ onNavigate, currentRoute }) => {
  const handleFooterNavClick = (linkName) => {
    if (onNavigate) {
      onNavigate(linkName)
    }
  }

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
            {["Home", "About", "Contact", "Career"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleFooterNavClick(link)
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "14px",
                    opacity: currentRoute === link ? "1" : "0.7",
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
