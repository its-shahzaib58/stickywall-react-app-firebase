import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
export default function index() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Signup />} />
    </Routes>
  )
}
