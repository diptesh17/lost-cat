"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const AuthCard = () => {
  const { login, register } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (isSubmitting) return

    if (validateLogin()) {
      setIsSubmitting(true)

      setTimeout(() => {
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
        setIsSubmitting(false)
      }, 100)
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (isSubmitting) {
      console.log("Already processing, ignoring click")
      return
    }

    console.log("Starting registration...")

    if (!validateRegister()) {
      console.log("Validation failed")
      return
    }

    setIsSubmitting(true)
    console.log("Setting isSubmitting to true")

    setTimeout(() => {
      try {
        console.log("Registering user with data:", registerData.username)

        const registrationSuccess = register(registerData)

        if (registrationSuccess) {
          console.log("Registration successful")

          toast.success("Registration successful! Please login now.", {
            position: "top-right",
            autoClose: 4000,
          })

          setRegisterData({
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            gender: "",
            contact: "",
            address: "",
          })

          setActiveTab("login")
          setIsSubmitting(false)
        } else {
          console.log("Registration failed")
          toast.error("Registration failed. Username might already exist.", {
            position: "top-right",
            autoClose: 3000,
          })
          setIsSubmitting(false)
        }
      } catch (error) {
        console.error("Registration error:", error)
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        })
        setIsSubmitting(false)
      }
    }, 1000)
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
    if (isSubmitting) return

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
        padding: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          minWidth: "280px",
          overflow: "hidden",
        }}
      >
        {/* Tab Headers */}
        <div style={{ display: "flex", backgroundColor: "#f8f9fa" }}>
          <button
            onClick={() => switchTab("login")}
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: "15px 10px",
              border: "none",
              backgroundColor: activeTab === "login" ? "#4CAF50" : "transparent",
              color: activeTab === "login" ? "white" : "#666",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Login
          </button>
          <button
            onClick={() => switchTab("register")}
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: "15px 10px",
              border: "none",
              backgroundColor: activeTab === "register" ? "#4CAF50" : "transparent",
              color: activeTab === "register" ? "white" : "#666",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div style={{ padding: "20px" }}>
          {activeTab === "login" ? (
            // Login Form
            <form onSubmit={handleLogin}>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "25px",
                  color: "#333",
                  marginTop: 0,
                  fontSize: "20px",
                }}
              >
                Welcome Back!
              </h2>

              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  disabled={isSubmitting}
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

              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  backgroundColor: isSubmitting ? "#ccc" : "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "14px",
                  borderRadius: "4px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  minHeight: "50px",
                }}
              >
                {isSubmitting ? (
                  <>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #fff",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          ) : (
            // Register Form
            <div
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                paddingRight: "5px",
              }}
            >
              <form onSubmit={handleRegister}>
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "25px",
                    color: "#333",
                    marginTop: 0,
                    fontSize: "20px",
                  }}
                >
                  Create Account
                </h2>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.username ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                    placeholder="Enter username"
                  />
                  {registerErrors.username && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.username}</p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.password ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                    placeholder="Enter password (min 6 characters)"
                  />
                  {registerErrors.password && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.password}</p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.confirmPassword ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                    placeholder="Confirm your password"
                  />
                  {registerErrors.confirmPassword && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>
                      {registerErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: registerErrors.email ? "1px solid red" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                    placeholder="Enter your email"
                  />
                  {registerErrors.email && (
                    <p style={{ color: "red", margin: "5px 0 0", fontSize: "12px" }}>{registerErrors.email}</p>
                  )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Gender:
                  </label>
                  <select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleRegisterChange}
                    disabled={isSubmitting}
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
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Contact Number:
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={registerData.contact}
                    onChange={handleRegisterChange}
                    disabled={isSubmitting}
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
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Address:
                  </label>
                  <textarea
                    name="address"
                    value={registerData.address}
                    onChange={handleRegisterChange}
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    backgroundColor: isSubmitting ? "#ccc" : "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "14px",
                    borderRadius: "4px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    minHeight: "50px",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #fff",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          .auth-container {
            padding: 5px !important;
          }
          
          .auth-card {
            margin: 5px !important;
            border-radius: 8px !important;
          }
          
          .tab-button {
            padding: 12px 8px !important;
            font-size: 14px !important;
          }
          
          .form-content {
            padding: 15px !important;
          }
          
          .form-title {
            font-size: 18px !important;
            margin-bottom: 20px !important;
          }
          
          .form-input {
            padding: 10px !important;
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
          
          .form-button {
            padding: 12px !important;
            font-size: 15px !important;
            min-height: 45px !important;
          }
          
          .register-form {
            max-height: 65vh !important;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 481px) and (max-width: 768px) {
          .auth-card {
            max-width: 450px !important;
          }
          
          .form-content {
            padding: 25px !important;
          }
        }

        /* Large screen optimizations */
        @media (min-width: 1200px) {
          .auth-card {
            max-width: 550px !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .form-input, .form-button, select, textarea {
            min-height: 44px !important; /* Apple's recommended touch target size */
          }
          
          .tab-button {
            min-height: 44px !important;
          }
        }

        /* Landscape mobile optimizations */
        @media (max-width: 768px) and (orientation: landscape) {
          .register-form {
            max-height: 50vh !important;
          }
          
          .auth-container {
            padding: 5px !important;
          }
        }

        /* High DPI screen optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .auth-card {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15) !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AuthCard
