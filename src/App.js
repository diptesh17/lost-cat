"use client"

import { useState } from "react"
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import HeroSection from "./components/HeroSection"
import ContentSection from "./components/ContentSection"
import OrangeStrip from "./components/OrangeStrip"
import BlackStrip from "./components/BlackStrip"
import Footer from "./components/Footer"
import PageContent from "./components/PageContent"

function App() {
  const [currentRoute, setCurrentRoute] = useState("Home")
  const [showMainContent, setShowMainContent] = useState(true)

  const handleNavigation = (route) => {
    setCurrentRoute(route)
    setShowMainContent(route === "Home")
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
      <Header />
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
    </div>
  )
}

export default App
