import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

// Pages
import Frontend from "../pages/Frontend"
import Auth from "../pages/Auth"
import AddEvents from './Frontend/AddEvents'
// import Dashboard from "../pages/Dashboard"
import PrivateRoute from '../components/PrivateRoute'

export default function Index() {
  const { authentication } = useContext(AuthContext);
  const isAuthenticated = authentication.isAuthentication;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to="/addevents" />} />
        <Route path='/addevents' element={<PrivateRoute Component={AddEvents} />} />
      </Routes>
    </BrowserRouter>
  )
}
