const PageContent = ({ currentRoute }) => {
  const renderContent = () => {
    switch (currentRoute) {
      case "Home":
        return (
          <div style={{ padding: "40px 20px", textAlign: "center", backgroundColor: "#f9f9f9" }}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Welcome to Home Page</h2>
            <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6" }}>
              This is the home page content. Here you can find information about our services and latest updates.
            </p>
          </div>
        )
      case "About":
        return (
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div style={{ padding: "40px 20px", textAlign: "center", maxWidth: "800px" }}>
              <h2 style={{ color: "#333", marginBottom: "30px", fontSize: "36px" }}>About Us</h2>
              <p style={{ color: "#666", fontSize: "18px", lineHeight: "1.8", marginBottom: "20px" }}>
                Learn more about our company, our mission, and the team behind our success. We are dedicated to
                providing excellent services and innovative solutions.
              </p>
              <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6" }}>
                Our journey started with a simple vision: to create meaningful digital experiences that make a
                difference. Today, we continue to push boundaries and deliver exceptional results for our clients
                worldwide.
              </p>
            </div>
          </div>
        )
      case "Contact":
        return (
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div style={{ padding: "40px 20px", textAlign: "center", maxWidth: "600px" }}>
              <h2 style={{ color: "#333", marginBottom: "30px", fontSize: "36px" }}>Contact Us</h2>
              <p style={{ color: "#666", fontSize: "18px", lineHeight: "1.6", marginBottom: "30px" }}>
                Get in touch with us for any inquiries or support.
              </p>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ color: "#666", fontSize: "16px", marginBottom: "10px" }}>
                    📧 Email: contact@loremipsum.com
                  </p>
                  <p style={{ color: "#666", fontSize: "16px", marginBottom: "10px" }}>📞 Phone: 1234-567-890</p>
                  <p style={{ color: "#666", fontSize: "16px" }}>📍 Address: 123 Business Street, City, State 12345</p>
                </div>
              </div>
            </div>
          </div>
        )
      case "Career":
        return (
          <div style={{ padding: "40px 20px", textAlign: "center", backgroundColor: "#f9f9f9", minHeight: "60vh" }}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Career Opportunities</h2>
            <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
              Join our team and be part of something amazing. We offer exciting career opportunities in various fields.
            </p>
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "15px" }}>
                <h3 style={{ color: "#333", marginBottom: "10px" }}>Frontend Developer</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  Experience with React, JavaScript, and modern web technologies.
                </p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "15px" }}>
                <h3 style={{ color: "#333", marginBottom: "10px" }}>Backend Developer</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  Experience with Node.js, databases, and API development.
                </p>
              </div>
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
                <h3 style={{ color: "#333", marginBottom: "10px" }}>UI/UX Designer</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>
                  Creative design skills with experience in Figma and Adobe Creative Suite.
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return renderContent()
}

export default PageContent
