"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const AuthCard = ({ onRegisterSuccess }) => {
  const { login, register } = useAuth()
  const [activeTab, setActiveTab] = useState("login")

  // Login form state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: "",
    contact: "",
    address: "",
  })

  const [loginErrors, setLoginErrors] = useState({})
  const [registerErrors, setRegisterErrors] = useState({})

  const validateLogin = () => {
    const errors = {}
    if (!loginData.username.trim()) {
      errors.username = "Username is required"
    }
    if (!loginData.password) {
      errors.password = "Password is required"
    }
    setLoginErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateRegister = () => {
    const errors = {}

    if (!registerData.username.trim()) {
      errors.username = "Username is required"
    } else if (registerData.username.length < 3) {
      errors.username = "Username must be at least 3 characters"
    }

    if (!registerData.password) {
      errors.password = "Password is required"
    } else if (registerData.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!registerData.email) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(registerData.email)) {
      errors.email = "Invalid email format"
    }

    if (!registerData.gender) {
      errors.gender = "Please select a gender"
    }

    if (!registerData.contact) {
      errors.contact = "Contact number is required"
    } else if (!/^\d{10}$/.test(registerData.contact)) {
      errors.contact = "Contact must be 10 digits"
    }

    setRegisterErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (validateLogin()) {
      const success = login(loginData.username, loginData.password)
      if (success) {
        toast.success(`Welcome ${loginData.username}!`, {
          position: "top-right",
          autoClose: 3000,
        })
      } else {
        toast.error("Invalid credentials! Use admin/12345", {
          position: "top-right",
          autoClose: 3000,
        })
      }
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (validateRegister()) {
      // Register the user
      register(registerData)

      // Auto-login the user after registration
      const autoLoginSuccess = login(registerData.username, registerData.password)

      if (autoLoginSuccess) {
        toast.success(`Welcome ${registerData.username}! Registration successful!`, {
          position: "top-right",
          autoClose: 3000,
        })

        // Reset form
        setRegisterData({
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          gender: "",
          contact: "",
          address: "",
        })

        // Trigger redirect to home screen
        if (onRegisterSuccess) {
          setTimeout(() => {
            onRegisterSuccess()
          }, 100) // Small delay to ensure state updates
        }
      }
    }
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setLoginErrors({})
    setRegisterErrors({})
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          overflow: "hidden",
        }}
      >
        {/* Tab Headers */}
        <div style={{ display: "flex", backgroundColor: "#f8f9fa" }}>
          <button
            onClick={() => switchTab("login")}
            style={{
              flex: 1,
              padding: "20px",
              border: "none",
              backgroundColor: activeTab === "login" ? "#4CAF50" : "transparent",
              color: activeTab === "login" ? "white" : "#666",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Login
          </button>
          <button
            onClick={() => switchTab("register")}
            style={{
              flex: 1,
              padding: "20px",
              border: "none",
              backgroundColor: activeTab === "register" ? "#4CAF50" : "transparent",
              color: activeTab === "register" ? "white" : "#666",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div style={{ padding: "40px" }}>
          {activeTab === "login" ? (
            // Login Form
            <form onSubmit={handleLogin}>
              <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", marginTop: 0 }}>Welcome Back!</h2>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: loginErrors.username ? "1px solid red" : "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  placeholder="Enter username (admin)"
                />
                {loginErrors.username && (
                  <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{loginErrors.username}</p>
                )}
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: loginErrors.password ? "1px solid red" : "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  placeholder="Enter password (12345)"
                />
                {loginErrors.password && (
                  <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{loginErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Login
              </button>
            </form>
          ) : (
            // Register Form
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <form onSubmit={handleRegister}>
                <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", marginTop: 0 }}>
                  Create Account
                </h2>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.username ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                  {registerErrors.username && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.username}</p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.password ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                  {registerErrors.password && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.password}</p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.confirmPassword ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                  {registerErrors.confirmPassword && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>
                      {registerErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.email ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                  {registerErrors.email && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.email}</p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Gender:
                  </label>
                  <select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleRegisterChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.gender ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {registerErrors.gender && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.gender}</p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Contact Number:
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={registerData.contact}
                    onChange={handleRegisterChange}
                    placeholder="Enter 10-digit number"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.contact ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                  {registerErrors.contact && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.contact}</p>
                  )}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Address:
                  </label>
                  <textarea
                    name="address"
                    value={registerData.address}
                    onChange={handleRegisterChange}
                    placeholder="Enter your address (optional)"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      minHeight: "60px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "15px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthCard
