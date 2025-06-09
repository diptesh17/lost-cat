"use client"

import { useState, useEffect } from "react"

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&crop=center",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 2000) // Change image every 2 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section
      style={{
        position: "relative",
        height: "600px",
        backgroundImage: `url(${heroImages[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "60px",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div
        style={{
          color: "white",
          maxWidth: "500px",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            marginBottom: "30px",
            fontWeight: "normal",
            lineHeight: "1.1",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          Feeling like you're lost?
        </h2>
        <button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "15px 30px",
            fontSize: "16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "normal",
          }}
        >
          Let Us Help
        </button>
      </div>

      {/* Image indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        {heroImages.map((_, index) => (
          <div
            key={index}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: currentImageIndex === index ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
