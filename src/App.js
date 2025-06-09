"use client"

import { useState, useEffect } from "react"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import HeroSection from "./components/HeroSection"
import ContentSection from "./components/ContentSection"
import OrangeStrip from "./components/OrangeStrip"
import BlackStrip from "./components/BlackStrip"
import Footer from "./components/Footer"
import PageContent from "./components/PageContent"
import AuthCard from "./components/AuthCard"
import DatabaseView from "./components/DatabaseView"

const AppContent = () => {
  const { isAuthenticated } = useAuth()
  const [currentRoute, setCurrentRoute] = useState("Home")
  const [showMainContent, setShowMainContent] = useState(true)
  const [showDB, setShowDB] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleNavigation = (route) => {
    setCurrentRoute(route)
    setShowMainContent(route === "Home")
  }

  const handleShowDB = () => {
    setShowDB(true)
  }

  const handleCloseDB = () => {
    setShowDB(false)
  }

  const handleRegisterSuccess = () => {
    console.log("Register success callback triggered")
    setIsRedirecting(true)

    // Force redirect to home screen
    setTimeout(() => {
      setCurrentRoute("Home")
      setShowMainContent(true)
      setIsRedirecting(false)
      console.log("Redirected to home screen")
    }, 500)
  }

  // Debug: Log authentication state changes
  useEffect(() => {
    console.log("Authentication state changed:", isAuthenticated)
  }, [isAuthenticated])

  if (!isAuthenticated && !isRedirecting) {
    return (
      <>
        <AuthCard onRegisterSuccess={handleRegisterSuccess} />
        <ToastContainer />
      </>
    )
  }

  if (isRedirecting) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#4CAF50", marginBottom: "20px" }}>Welcome!</h2>
          <p style={{ color: "#666" }}>Redirecting to home screen...</p>
        </div>
        <ToastContainer />
      </div>
    )
  }

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header onShowDB={handleShowDB} />
      <Navigation onNavigate={handleNavigation} currentRoute={currentRoute} />

      <div style={{ flex: 1 }}>
        {showMainContent ? (
          <>
            <HeroSection />
            <ContentSection />
            <OrangeStrip />
            <BlackStrip />
          </>
        ) : (
          <PageContent currentRoute={currentRoute} />
        )}
      </div>

      <Footer onNavigate={handleNavigation} currentRoute={currentRoute} />

      {showDB && <DatabaseView onClose={handleCloseDB} />}
      <ToastContainer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
