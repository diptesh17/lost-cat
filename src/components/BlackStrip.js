const BlackStrip = () => {
  return (
    <section
      style={{
        backgroundColor: "#000",
        padding: "40px 0",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            color: "white",
            margin: "0 0 20px 0",
            fontSize: "28px",
            fontWeight: "normal",
          }}
        >
          Changing the world one pixel at a time
        </h2>
        <button
          style={{
            backgroundColor: "white",
            color: "#000",
            border: "none",
            padding: "15px 40px",
            fontSize: "18px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>
    </section>
  )
}

export default BlackStrip
