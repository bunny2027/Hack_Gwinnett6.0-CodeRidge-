import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import './index.css'
import App from './App.jsx'
import Journal from './Journal.jsx'
import Appointment from './Function/Appointment.jsx'
import NavBar from './Function/NavBar.jsx'

//Nav bar stays on every page, the current page renders in <Outlet />
function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/appointment" element={<Appointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
