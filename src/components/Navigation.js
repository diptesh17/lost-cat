"use client"

const Navigation = ({ onNavigate, currentRoute }) => {
  const handleNavClick = (linkName) => {
    onNavigate(linkName)
    console.log(`Navigating to ${linkName}`)
  }

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
          {["Home", "About", "Contact", "Career"].map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link)
                }}
                style={{
                  textDecoration: "none",
                  color: currentRoute === link ? "#4CAF50" : "#666",
                  fontSize: "14px",
                  fontWeight: currentRoute === link ? "bold" : "normal",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                  backgroundColor: currentRoute === link ? "#f0f8f0" : "transparent",
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
