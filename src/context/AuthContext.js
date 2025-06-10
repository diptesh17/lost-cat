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
    console.log("Login attempt for:", username)
    console.log("Current users in database:", users.length)
    console.log(
      "Users array:",
      users.map((u) => ({ username: u.username, password: u.password })),
    )

    // Check if it's admin login
    if (username === "admin" && password === "12345") {
      setIsAuthenticated(true)
      setCurrentUser({ username: "admin", role: "admin" })
      console.log("Admin login successful")
      return true
    }

    // Check if it's a registered user login
    const user = users.find((u) => u.username === username && u.password === password)
    console.log("Found user:", user)

    if (user) {
      setIsAuthenticated(true)
      setCurrentUser({ username: user.username, role: "user", ...user })
      console.log("User login successful:", username)
      return true
    }

    console.log("Login failed for:", username)
    return false
  }

  const register = (userData) => {
    console.log("Registering user:", userData.username)
    console.log("Current users count before registration:", users.length)

    // Check if username already exists
    const existingUser = users.find((user) => user.username === userData.username)
    if (existingUser) {
      console.log("Username already exists:", userData.username)
      return false
    }

    // Create new user with unique ID and timestamp
    const newUser = {
      id: Date.now(), // Unique ID based on timestamp
      username: userData.username,
      password: userData.password,
      email: userData.email,
      gender: userData.gender,
      contact: userData.contact,
      address: userData.address || "N/A",
      registeredAt: new Date().toLocaleString(),
    }

    console.log("Creating new user:", newUser)

    // Add user to database - this should only happen ONCE
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser]
      console.log("User added to database. New count:", updatedUsers.length)
      console.log(
        "Updated users array:",
        updatedUsers.map((u) => ({ username: u.username, id: u.id })),
      )
      return updatedUsers
    })

    return true
  }

  const logout = () => {
    console.log("User logged out")
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
