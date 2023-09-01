import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import Auth from './Auth'
import { useAuthContext } from '../contexts/AuthContext'
import PrivateRoute from './PrivateRoutes'

export default function Index() {
  const {isAuth} = useAuthContext()
  return (
    <>
    <Routes>
        <Route path="/*" element={<PrivateRoute Component={Home}/>}  />
        <Route path="/auth/*" element={!isAuth ? <Auth /> : <Navigate to="/"/>} />
    </Routes>
    </>
  )
}
