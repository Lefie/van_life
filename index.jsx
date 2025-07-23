
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Vans from './pages/Vans'
import VanDetails from './pages/VanDetails'
import About from './pages/About'
import Home from './pages/Home'
import BaseLayout from './pages/BaseLayout'
import HostLayout from './pages/Host/HostLayout'
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
import Registration from './pages/Registration'
import AuthRequired from './pages/AuthRequired'
import { UserLoginContext, UserLoginProvider } from './context/UserLoginContext'
import { useContext } from 'react'
import ReviewChart from './ui_components/ReviewChart'
import IncomeChart from './ui_components/IncomeChart'
import UserLayout from './pages/User/UserLayout'
import UserDashboard from './pages/User/Dashboard'
import RentalHisotry from './pages/User/RentalHistory'
import Upcoming from './pages/User/Upcoming'



function App() {

  
  return (
    
    <BrowserRouter>
    <UserLoginProvider>
      <Routes>  
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Registration />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetails />} />

            <Route element={<AuthRequired />}>
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
                <Route path=":username" element={<UserLayout />}>
                  <Route index element={<UserDashboard />} />
                  <Route path="rental_history" element={<RentalHisotry />} />
                  <Route path="upcoming_rental" element={<Upcoming />} />
                <Route />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
      </UserLoginProvider>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
    <App />
)
