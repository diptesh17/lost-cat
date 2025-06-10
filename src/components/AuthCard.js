"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const AuthCard = () => {
  const { login, register } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [isRedirecting, setIsRedirecting] = useState(false)

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

    // Prevent multiple submissions
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

    // Simulate processing time and then show success
    setTimeout(() => {
      try {
        console.log("Registering user with data:", registerData.username)

        // Register the user - this should create only ONE entry
        const registrationSuccess = register(registerData)

        if (registrationSuccess) {
          console.log("Registration successful")

          // Show success toast and ask user to login
          toast.success("Registration successful! Please login now.", {
            position: "top-right",
            autoClose: 4000,
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

          // Switch to login tab
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
    }, 1000) // 1 second processing time
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

  // Show redirecting screen
  // if (isRedirecting) {
  //   return (
  //     <div
  //       style={{
  //         minHeight: "100vh",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         backgroundColor: "#f5f5f5",
  //         padding: "20px",
  //       }}
  //     >
  //       <div
  //         style={{
  //           backgroundColor: "white",
  //           borderRadius: "10px",
  //           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  //           padding: "60px 40px",
  //           textAlign: "center",
  //           maxWidth: "400px",
  //           width: "100%",
  //         }}
  //       >
  //         <div
  //           style={{
  //             width: "60px",
  //             height: "60px",
  //             border: "4px solid #4CAF50",
  //             borderTop: "4px solid transparent",
  //             borderRadius: "50%",
  //             animation: "spin 1s linear infinite",
  //             margin: "0 auto 30px",
  //           }}
  //         />
  //         <h2 style={{ color: "#4CAF50", marginBottom: "20px", fontSize: "24px" }}>🎉 Registration Successful!</h2>
  //         <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>
  //           Welcome aboard! Redirecting you to home page...
  //         </p>
  //         <div
  //           style={{
  //             backgroundColor: "#f0f8f0",
  //             padding: "15px",
  //             borderRadius: "8px",
  //             border: "1px solid #4CAF50",
  //           }}
  //         >
  //           <p style={{ margin: 0, color: "#4CAF50", fontSize: "14px", fontWeight: "bold" }}>
  //             ✅ Account created successfully
  //           </p>
  //         </div>
  //       </div>

  //       {/* CSS for spinner animation */}
  //       <style>{`
  //         @keyframes spin {
  //           0% { transform: rotate(0deg); }
  //           100% { transform: rotate(360deg); }
  //         }
  //       `}</style>
  //     </div>
  //   )
  // }

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
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: "20px",
              border: "none",
              backgroundColor: activeTab === "login" ? "#4CAF50" : "transparent",
              color: activeTab === "login" ? "white" : "#666",
              fontSize: "18px",
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
              padding: "20px",
              border: "none",
              backgroundColor: activeTab === "register" ? "#4CAF50" : "transparent",
              color: activeTab === "register" ? "white" : "#666",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
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

              <div style={{ marginBottom: "30px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
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
                  padding: "15px",
                  borderRadius: "4px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
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
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
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
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
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
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
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
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
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
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
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
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
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
                    padding: "15px",
                    borderRadius: "4px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
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
      `}</style>
    </div>
  )
}

export default AuthCard
