const HeroSection = () => {
  return (
    <section
      style={{
        position: "relative",
        height: "500px",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=600&fit=crop&crop=center)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "60px",
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
    </section>
  )
}

export default HeroSection
