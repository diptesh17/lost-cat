"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const PageContent = ({ currentRoute }) => {
  const [aboutStats, setAboutStats] = useState({
    experience: 0,
    projects: 0,
    clients: 0,
    awards: 0,
  })

  const [careerFilters, setCareerFilters] = useState("all")
  const [expandedJob, setExpandedJob] = useState(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [currentJobId, setCurrentJobId] = useState(null)
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    currentCTC: "",
    expectedCTC: "",
    noticePeriod: "",
    resume: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // Animated counter effect for About section
  useEffect(() => {
    if (currentRoute === "About") {
      const targets = { experience: 5, projects: 150, clients: 50, awards: 12 }
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepTime = duration / steps

      const counters = Object.keys(targets).map((key) => {
        const target = targets[key]
        const increment = target / steps
        let current = 0

        return setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(counters.find((c) => c === counters[Object.keys(targets).indexOf(key)]))
          }
          setAboutStats((prev) => ({ ...prev, [key]: Math.floor(current) }))
        }, stepTime)
      })

      return () => counters.forEach(clearInterval)
    }
  }, [currentRoute])

  const jobData = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote/Hybrid",
      experience: "3-5 years",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      description:
        "Lead frontend development projects, mentor junior developers, and architect scalable user interfaces.",
      requirements: [
        "5+ years of React experience",
        "Strong TypeScript knowledge",
        "Experience with modern build tools",
        "Leadership experience preferred",
      ],
      salary: "₹12-18 LPA",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Pune, India",
      experience: "2-4 years",
      skills: ["Node.js", "MongoDB", "Express", "AWS"],
      description: "Build robust APIs, optimize database performance, and ensure system scalability.",
      requirements: [
        "3+ years of Node.js experience",
        "Database design expertise",
        "Cloud platform knowledge",
        "API development experience",
      ],
      salary: "₹8-14 LPA",
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      type: "Full-time",
      location: "Mumbai, India",
      experience: "2-3 years",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      description: "Create intuitive user experiences and beautiful interfaces that users love.",
      requirements: [
        "Strong portfolio required",
        "Figma/Adobe XD proficiency",
        "User research experience",
        "Prototyping skills",
      ],
      salary: "₹6-12 LPA",
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Infrastructure",
      type: "Contract",
      location: "Remote",
      experience: "4-6 years",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      description: "Manage cloud infrastructure, automate deployments, and ensure system reliability.",
      requirements: [
        "Docker/Kubernetes expertise",
        "AWS/Azure experience",
        "CI/CD pipeline knowledge",
        "Monitoring tools experience",
      ],
      salary: "₹15-22 LPA",
      posted: "5 days ago",
    },
  ]

  const filteredJobs = jobData.filter((job) => {
    if (careerFilters === "all") return true
    return job.department.toLowerCase() === careerFilters
  })

  const handleApplyClick = (jobId) => {
    setCurrentJobId(jobId)
    setShowApplicationForm(true)
  }

  const handleCloseForm = () => {
    setShowApplicationForm(false)
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      currentCTC: "",
      expectedCTC: "",
      noticePeriod: "",
      resume: null,
    })
    setFormErrors({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplicationData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setApplicationData((prev) => ({ ...prev, resume: file }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!applicationData.name.trim()) errors.name = "Name is required"
    if (!applicationData.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) errors.email = "Please enter a valid email"
    if (!applicationData.phone.trim()) errors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(applicationData.phone)) errors.phone = "Please enter a valid 10-digit number"
    if (!applicationData.currentCTC.trim()) errors.currentCTC = "Current CTC is required"
    if (!applicationData.expectedCTC.trim()) errors.expectedCTC = "Expected CTC is required"
    if (!applicationData.noticePeriod.trim()) errors.noticePeriod = "Notice period is required"
    if (!applicationData.resume) errors.resume = "Resume is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        toast.success("Successfully applied!", {
          position: "top-right",
          autoClose: 3000,
        })
        setIsSubmitting(false)
        handleCloseForm()
      }, 1500)
    }
  }

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
              minHeight: "80vh",
              backgroundColor: "#f9f9f9",
              padding: "40px 20px",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              {/* Hero Section */}
              <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <h2 style={{ color: "#333", marginBottom: "20px", fontSize: "42px", fontWeight: "bold" }}>About Us</h2>
                <p style={{ color: "#666", fontSize: "20px", lineHeight: "1.8", maxWidth: "800px", margin: "0 auto" }}>
                  We are a passionate team of innovators, creators, and problem-solvers dedicated to building
                  exceptional digital experiences that make a real difference in people's lives.
                </p>
              </div>

              {/* Stats Section */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "30px",
                  marginBottom: "60px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "40px 20px",
                    borderRadius: "15px",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: "48px", fontWeight: "bold", color: "#4CAF50", marginBottom: "10px" }}>
                    {aboutStats.experience}+
                  </div>
                  <div style={{ color: "#666", fontSize: "18px", fontWeight: "600" }}>Years Experience</div>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "40px 20px",
                    borderRadius: "15px",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: "48px", fontWeight: "bold", color: "#2196F3", marginBottom: "10px" }}>
                    {aboutStats.projects}+
                  </div>
                  <div style={{ color: "#666", fontSize: "18px", fontWeight: "600" }}>Projects Completed</div>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "40px 20px",
                    borderRadius: "15px",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: "48px", fontWeight: "bold", color: "#FF9800", marginBottom: "10px" }}>
                    {aboutStats.clients}+
                  </div>
                  <div style={{ color: "#666", fontSize: "18px", fontWeight: "600" }}>Happy Clients</div>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "40px 20px",
                    borderRadius: "15px",
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: "48px", fontWeight: "bold", color: "#E91E63", marginBottom: "10px" }}>
                    {aboutStats.awards}+
                  </div>
                  <div style={{ color: "#666", fontSize: "18px", fontWeight: "600" }}>Awards Won</div>
                </div>
              </div>

              {/* Mission & Vision */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "40px",
                  marginBottom: "60px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "20px" }}>🎯</div>
                  <h3 style={{ color: "#333", marginBottom: "20px", fontSize: "24px" }}>Our Mission</h3>
                  <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.8" }}>
                    To empower businesses and individuals through innovative technology solutions that simplify complex
                    challenges and create meaningful digital experiences that drive growth and success.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "20px" }}>🚀</div>
                  <h3 style={{ color: "#333", marginBottom: "20px", fontSize: "24px" }}>Our Vision</h3>
                  <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.8" }}>
                    To be the leading force in digital transformation, setting new standards for innovation, quality,
                    and customer satisfaction while building a sustainable future for technology and society.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "50px 40px",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ textAlign: "center", color: "#333", marginBottom: "40px", fontSize: "28px" }}>
                  Our Core Values
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "30px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "50px", marginBottom: "15px" }}>💡</div>
                    <h4 style={{ color: "#333", marginBottom: "10px" }}>Innovation</h4>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                      Constantly pushing boundaries and exploring new possibilities
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "50px", marginBottom: "15px" }}>🤝</div>
                    <h4 style={{ color: "#333", marginBottom: "10px" }}>Collaboration</h4>
                    <p style={{ color: "#666", fontSize: "14px" }}>Working together to achieve extraordinary results</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "50px", marginBottom: "15px" }}>⭐</div>
                    <h4 style={{ color: "#333", marginBottom: "10px" }}>Excellence</h4>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                      Delivering the highest quality in everything we do
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "50px", marginBottom: "15px" }}>🌱</div>
                    <h4 style={{ color: "#333", marginBottom: "10px" }}>Growth</h4>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                      Continuous learning and improvement for sustainable success
                    </p>
                  </div>
                </div>
              </div>
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
              padding: "20px",
            }}
          >
            <div style={{ textAlign: "center", maxWidth: "800px", width: "100%" }}>
              <h2 style={{ color: "#333", marginBottom: "30px", fontSize: "36px" }}>Contact Us</h2>
              <p style={{ color: "#666", fontSize: "18px", lineHeight: "1.6", marginBottom: "40px" }}>
                Get in touch with us through any of the following channels. We'd love to hear from you!
              </p>

              {/* Contact Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "25px",
                  marginBottom: "40px",
                }}
              >
                {/* Email Card */}
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "30px 25px",
                    borderRadius: "15px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)"
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"
                  }}
                  onClick={() => window.open("mailto:diptesh.deore@accenture.com", "_blank")}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      marginBottom: "15px",
                      color: "#4CAF50",
                    }}
                  >
                    📧
                  </div>
                  <h3 style={{ color: "#333", marginBottom: "10px", fontSize: "20px" }}>Email</h3>
                  <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
                    Send us an email for business inquiries
                  </p>
                  <a
                    href="mailto:diptesh.deore@accenture.com"
                    style={{
                      color: "#4CAF50",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "14px",
                      wordBreak: "break-all",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    diptesh.deore@accenture.com
                  </a>
                </div>

                {/* LinkedIn Card */}
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "30px 25px",
                    borderRadius: "15px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)"
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"
                  }}
                  onClick={() => window.open("https://www.linkedin.com/in/diptesh017/", "_blank")}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      marginBottom: "15px",
                      color: "#0077B5",
                    }}
                  >
                    💼
                  </div>
                  <h3 style={{ color: "#333", marginBottom: "10px", fontSize: "20px" }}>LinkedIn</h3>
                  <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
                    Connect with us professionally
                  </p>
                  <a
                    href="https://www.linkedin.com/in/diptesh017/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#0077B5",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    linkedin.com/in/diptesh017
                  </a>
                </div>

                {/* Phone Card */}
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "30px 25px",
                    borderRadius: "15px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)"
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"
                  }}
                  onClick={() => window.open("tel:+919766162144", "_blank")}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      marginBottom: "15px",
                      color: "#FF6B35",
                    }}
                  >
                    📞
                  </div>
                  <h3 style={{ color: "#333", marginBottom: "10px", fontSize: "20px" }}>Phone</h3>
                  <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
                    Call us for immediate assistance
                  </p>
                  <a
                    href="tel:+919766162144"
                    style={{
                      color: "#FF6B35",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    +91 9766162144
                  </a>
                </div>

                {/* Instagram Card */}
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "30px 25px",
                    borderRadius: "15px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)"
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"
                  }}
                  onClick={() => window.open("https://www.instagram.com/diptesh_deore17/", "_blank")}
                >
                  <div
                    style={{
                      fontSize: "40px",
                      marginBottom: "15px",
                      background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    📸
                  </div>
                  <h3 style={{ color: "#333", marginBottom: "10px", fontSize: "20px" }}>Instagram</h3>
                  <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
                    Follow us for updates and behind the scenes
                  </p>
                  <a
                    href="https://www.instagram.com/diptesh_deore17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#E4405F",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    @diptesh_deore17
                  </a>
                </div>
              </div>

              {/* Call to Action */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "15px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  border: "2px solid #4CAF50",
                }}
              >
                <h3 style={{ color: "#4CAF50", marginBottom: "15px", fontSize: "24px" }}>🚀 Ready to Get Started?</h3>
                <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>
                  Choose your preferred way to connect with us. We're here to help you achieve your goals!
                </p>
                <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => window.open("mailto:diptesh.deore@accenture.com", "_blank")}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "12px 25px",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#45a049"
                      e.currentTarget.style.transform = "scale(1.05)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#4CAF50"
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                  >
                    📧 Send Email
                  </button>
                  <button
                    onClick={() => window.open("tel:+919766162144", "_blank")}
                    style={{
                      backgroundColor: "#FF6B35",
                      color: "white",
                      border: "none",
                      padding: "12px 25px",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e55a2b"
                      e.currentTarget.style.transform = "scale(1.05)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FF6B35"
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                  >
                    📞 Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case "Career":
        return (
          <div
            style={{
              minHeight: "80vh",
              backgroundColor: "#f9f9f9",
              padding: "40px 20px",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h2 style={{ color: "#333", marginBottom: "20px", fontSize: "42px", fontWeight: "bold" }}>
                  Join Our Team
                </h2>
                <p style={{ color: "#666", fontSize: "20px", lineHeight: "1.8", maxWidth: "800px", margin: "0 auto" }}>
                  Be part of something extraordinary. We're looking for passionate individuals who want to make a
                  difference and grow their careers with us.
                </p>
              </div>

              {/* Filter Buttons */}
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <div style={{ display: "inline-flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  {["all", "engineering", "design", "infrastructure"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setCareerFilters(filter)}
                      style={{
                        padding: "10px 20px",
                        border: "2px solid #4CAF50",
                        borderRadius: "25px",
                        backgroundColor: careerFilters === filter ? "#4CAF50" : "white",
                        color: careerFilters === filter ? "white" : "#4CAF50",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                        textTransform: "capitalize",
                      }}
                      onMouseEnter={(e) => {
                        if (careerFilters !== filter) {
                          e.currentTarget.style.backgroundColor = "#f0f8f0"
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (careerFilters !== filter) {
                          e.currentTarget.style.backgroundColor = "white"
                        }
                      }}
                    >
                      {filter === "all" ? "All Positions" : filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Listings */}
              <div style={{ display: "grid", gap: "25px" }}>
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "15px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)"
                      e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div style={{ padding: "30px" }}>
                      {/* Job Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "20px",
                          flexWrap: "wrap",
                          gap: "15px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h3 style={{ color: "#333", marginBottom: "8px", fontSize: "24px", fontWeight: "bold" }}>
                            {job.title}
                          </h3>
                          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "10px" }}>
                            <span
                              style={{
                                color: "#4CAF50",
                                fontSize: "14px",
                                fontWeight: "600",
                                backgroundColor: "#f0f8f0",
                                padding: "4px 12px",
                                borderRadius: "12px",
                              }}
                            >
                              {job.department}
                            </span>
                            <span style={{ color: "#666", fontSize: "14px" }}>📍 {job.location}</span>
                            <span style={{ color: "#666", fontSize: "14px" }}>⏰ {job.type}</span>
                            <span style={{ color: "#666", fontSize: "14px" }}>📅 {job.posted}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: "#4CAF50", fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>
                            {job.salary}
                          </div>
                          <div style={{ color: "#666", fontSize: "14px" }}>{job.experience}</div>
                        </div>
                      </div>

                      {/* Job Description */}
                      <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
                        {job.description}
                      </p>

                      {/* Skills */}
                      <div style={{ marginBottom: "20px" }}>
                        <h4 style={{ color: "#333", marginBottom: "10px", fontSize: "16px" }}>Required Skills:</h4>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              style={{
                                backgroundColor: "#e3f2fd",
                                color: "#1976d2",
                                padding: "6px 12px",
                                borderRadius: "15px",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expandable Requirements */}
                      <div>
                        <button
                          onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#4CAF50",
                            fontSize: "14px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginBottom: "15px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {expandedJob === job.id ? "▼" : "▶"} View Requirements
                        </button>

                        {expandedJob === job.id && (
                          <div
                            style={{
                              backgroundColor: "#f8f9fa",
                              padding: "20px",
                              borderRadius: "10px",
                              marginBottom: "20px",
                              animation: "fadeIn 0.3s ease",
                            }}
                          >
                            <h4 style={{ color: "#333", marginBottom: "10px", fontSize: "16px" }}>Requirements:</h4>
                            <ul style={{ color: "#666", fontSize: "14px", lineHeight: "1.6", paddingLeft: "20px" }}>
                              {job.requirements.map((req, index) => (
                                <li key={index} style={{ marginBottom: "5px" }}>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Apply Button */}
                      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                        <button
                          onClick={() => handleApplyClick(job.id)}
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            padding: "12px 30px",
                            borderRadius: "25px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#45a049"
                            e.currentTarget.style.transform = "scale(1.05)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#4CAF50"
                            e.currentTarget.style.transform = "scale(1)"
                          }}
                        >
                          📧 Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Jobs Message */}
              {filteredJobs.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontSize: "60px", marginBottom: "20px" }}>🔍</div>
                  <h3 style={{ color: "#666", marginBottom: "10px" }}>No positions found</h3>
                  <p style={{ color: "#999" }}>Try selecting a different department filter.</p>
                </div>
              )}

              {/* Application Form Modal */}
              {showApplicationForm && (
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
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                      width: "100%",
                      maxWidth: "600px",
                      maxHeight: "90vh",
                      overflowY: "auto",
                      padding: "30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: "24px", color: "#333" }}>
                        Apply for {jobData.find((job) => job.id === currentJobId)?.title || "Position"}
                      </h3>
                      <button
                        onClick={handleCloseForm}
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

                    <form onSubmit={handleSubmit}>
                      <div style={{ marginBottom: "20px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Full Name*
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={applicationData.name}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: formErrors.name ? "1px solid red" : "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                          placeholder="Enter your full name"
                        />
                        {formErrors.name && (
                          <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{formErrors.name}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: "20px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Email*
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={applicationData.email}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: formErrors.email ? "1px solid red" : "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                          placeholder="Enter your email address"
                        />
                        {formErrors.email && (
                          <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{formErrors.email}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: "20px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Phone*
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={applicationData.phone}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: formErrors.phone ? "1px solid red" : "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                          placeholder="Enter your phone number"
                        />
                        {formErrors.phone && (
                          <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{formErrors.phone}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: "20px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Current CTC (₹)*
                        </label>
                        <input
                          type="text"
                          name="currentCTC"
                          value={applicationData.currentCTC}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: formErrors.currentCTC ? "1px solid red" : "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                          placeholder="E.g., 8 LPA"
                        />
                        {formErrors.currentCTC && (
                          <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{formErrors.currentCTC}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: "20px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Expected CTC (₹)*
                        </label>
                        <input
                          type="text"
                          name="expectedCTC"
                          value={applicationData.expectedCTC}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: formErrors.expectedCTC ? "1px solid red" : "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                          placeholder="E.g., 12 LPA"
                        />
                        {formErrors.expectedCTC && (
                          <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{formErrors.expectedCTC}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: "20px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Notice Period*
                        </label>
                        <input
                          type="text"
                          name="noticePeriod"
                          value={applicationData.noticePeriod}
                          onChange={handleInputChange}
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: formErrors.noticePeriod ? "1px solid red" : "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                          }}
                          placeholder="E.g., 30 days, 2 months"
                        />
                        {formErrors.noticePeriod && (
                          <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{formErrors.noticePeriod}</p>
                        )}
                      </div>

                      <div style={{ marginBottom: "30px" }}>
                        <label
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Resume/CV*
                        </label>
                        <div
                          style={{
                            border: formErrors.resume ? "1px dashed red" : "1px dashed #ddd",
                            borderRadius: "8px",
                            padding: "20px",
                            textAlign: "center",
                            backgroundColor: "#f9f9f9",
                            cursor: "pointer",
                          }}
                          onClick={() => document.getElementById("resume-upload").click()}
                        >
                          <input
                            type="file"
                            id="resume-upload"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            accept=".pdf,.doc,.docx"
                          />
                          {applicationData.resume ? (
                            <div style={{ color: "#4CAF50", fontWeight: "bold" }}>✅ {applicationData.resume.name}</div>
                          ) : (
                            <div>
                              <div style={{ fontSize: "24px", marginBottom: "10px" }}>📄</div>
                              <p style={{ margin: 0, color: "#666" }}>Click to upload your resume (PDF, DOC, DOCX)</p>
                            </div>
                          )}
                        </div>
                        {formErrors.resume && (
                          <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{formErrors.resume}</p>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          onClick={handleCloseForm}
                          style={{
                            backgroundColor: "#f5f5f5",
                            color: "#666",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          style={{
                            backgroundColor: isSubmitting ? "#cccccc" : "#4CAF50",
                            color: "white",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "8px",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            fontSize: "14px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  border: "2px solid white",
                                  borderTopColor: "transparent",
                                  borderRadius: "50%",
                                  animation: "spin 1s linear infinite",
                                }}
                              ></div>
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {renderContent()}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default PageContent
