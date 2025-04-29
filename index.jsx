
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Nav from './ui_components/Nav'
import Main from './ui_components/Main'
import Footer from './ui_components/Footer'
import Vans from './ui_components/Vans'
import About from './ui_components/About'

function App() {
  return (
  <BrowserRouter>
    <Routes>  
        <Route path="/" element={<Home />}  />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
    </Routes>
  </BrowserRouter>
  )
}

function Home() {
  return (
    <>   
     <Nav />
     <Main />
     <Footer />
    </>
  )
}


createRoot(document.getElementById('root')).render(
  <App />
)
