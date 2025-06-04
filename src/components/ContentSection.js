"use client"

import { useState } from "react"

const ContentSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0)

  const quotes = [
    "The most active thing about me is my imagination.",
    "Innovation distinguishes between a leader and a follower.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  ]

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length)
  }

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)
  }

  return (
    <section
      style={{
        padding: "50px 20px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "10px",
            color: "#333",
            fontWeight: "normal",
          }}
        >
          Welcome to Dev
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          A place to bring your ideas to life
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "50px",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                lineHeight: "1.6",
                color: "#666",
                marginBottom: "30px",
                fontSize: "14px",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#4CAF50", marginRight: "10px", fontSize: "16px" }}>✓</span>
                  <span style={{ fontSize: "14px", color: "#666" }}>Some Link</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <blockquote
              style={{
                fontSize: "18px",
                fontStyle: "italic",
                color: "#888",
                textAlign: "center",
                marginBottom: "20px",
                position: "relative",
                paddingLeft: "20px",
                borderLeft: "4px solid #eee",
                lineHeight: "1.4",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              "{quotes[currentQuote]}"
            </blockquote>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <button
                onClick={prevQuote}
                style={{
                  backgroundColor: "#eee",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ‹
              </button>
              <span style={{ fontSize: "12px", color: "#999" }}>
                {currentQuote + 1} / {quotes.length}
              </span>
              <button
                onClick={nextQuote}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentSection
