
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Vans from './pages/Vans'
import About from './pages/About'
import Home from './pages/Home'

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




createRoot(document.getElementById('root')).render(
  <App />
)
