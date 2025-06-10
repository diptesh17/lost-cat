"use client"

import { useState } from "react"
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

  // Show auth card if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <AuthCard />
        <ToastContainer />
      </>
    )
  }

  // Show main application when authenticated
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
