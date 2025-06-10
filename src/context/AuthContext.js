"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const login = (username, password) => {
    // Check if it's admin login
    if (username === "admin" && password === "12345") {
      setIsAuthenticated(true)
      setCurrentUser({ username: "admin", role: "admin" })
      return true
    }

    // Check if it's a registered user login
    const user = users.find((u) => u.username === username && u.password === password)
    if (user) {
      setIsAuthenticated(true)
      setCurrentUser({ username: user.username, role: "user", ...user })
      return true
    }

    return false
  }

  const register = (userData) => {
    // Create new user with timestamp and unique ID
    const newUser = {
      id: Date.now(),
      username: userData.username,
      password: userData.password,
      email: userData.email,
      gender: userData.gender,
      contact: userData.contact,
      address: userData.address || "N/A",
      registeredAt: new Date().toLocaleString(),
    }

    // Add user to database
    setUsers((prev) => [...prev, newUser])

    console.log("User registered successfully:", newUser)
    console.log("Total users in database:", users.length + 1)

    return true
  }

  const logout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  const value = {
    isAuthenticated,
    users,
    currentUser,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
