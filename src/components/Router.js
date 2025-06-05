"use client"

import { useState } from "react"

const Router = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState("Home")

  const navigate = (route) => {
    setCurrentRoute(route)
  }

  return <div>{children({ currentRoute, navigate })}</div>
}

export default Router
