
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Nav from './ui_components/Nav'
import Main from './ui_components/Main'
import Footer from './ui_components/Footer'

function App() {
  return (
  <BrowserRouter>
    <Routes>  
        <Route path="/" element={<Home />}  />
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
