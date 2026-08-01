import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
