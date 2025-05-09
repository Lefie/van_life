
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Vans from './pages/Vans'
import VanDetails from './pages/VanDetails'
import About from './pages/About'
import Home from './pages/Home'
import BaseLayout from './pages/BaseLayout'
import HostLayout from './pages/Host/HostLayout'
import { makeServer } from './mock_server'
import Dashboard from "./pages/Host/Dashboard"
import Income from './pages/Host/Income'
import VansHost from './pages/Host/VansHost'
import VansDetailsHost from './pages/Host/VansDetailsHost'
import Reviews from "./pages/Host/Reviews"
import Details from "./pages/Host/VansHost/Details"
import Pricing from "./pages/Host/VansHost/Pricing"
import Photos from "./pages/Host/VansHost/Photos"
import NotFound from './pages/NotFound'
import Login from './pages/Login'

if (process.env.NODE_ENV === "development") {
  makeServer(); 
}

function App() {
  return (
  <BrowserRouter>
    <Routes>  
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetails />} />
          <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard/>} />
              <Route path="income" element={<Income />}/>
              <Route path="vans" element={<VansHost />} />

              <Route path="vans/:id" element={<VansDetailsHost />}>
                <Route index element={<Details />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="photos" element={<Photos />} />
              </Route>
              
              <Route path="reviews" element={<Reviews/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
