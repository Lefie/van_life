
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Vans from './pages/Vans'
import VanDetails from './pages/VanDetails'
import About from './pages/About'
import Home from './pages/Home'
import BaseLayout from './pages/BaseLayout'
import { makeServer } from './mock_server'

if (process.env.NODE_ENV === "development") {
  makeServer(); 
}

function App() {
  return (
  <BrowserRouter>
    <Routes>  
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetails />} />
        </Route>
    </Routes>
  </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
