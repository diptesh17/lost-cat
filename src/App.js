import Header from "./components/Header"
import Navigation from "./components/Navigation"
import HeroSection from "./components/HeroSection"
import ContentSection from "./components/ContentSection"
import OrangeStrip from "./components/OrangeStrip"
import BlackStrip from "./components/BlackStrip"
import Footer from "./components/Footer"

function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Header />
      <Navigation />
      <HeroSection />
      <ContentSection />
      <OrangeStrip />
      <BlackStrip />
      <Footer />
    </div>
  )
}

export default App
