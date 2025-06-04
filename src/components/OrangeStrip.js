const OrangeStrip = () => {
  return (
    <section
      style={{
        backgroundColor: "#FF8C00",
        padding: "20px 0",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <h3
          style={{
            color: "white",
            margin: 0,
            fontSize: "24px",
            fontWeight: "normal",
            textTransform: "lowercase",
          }}
        >
          let's put an end to world hunger today
        </h3>
        <button
          style={{
            backgroundColor: "white",
            color: "#FF8C00",
            border: "none",
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Join Today
        </button>
      </div>
    </section>
  )
}

export default OrangeStrip
