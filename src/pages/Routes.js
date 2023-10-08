import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'


import PrivateRoute from './PrivateRoutes'

export default function Index() {

  return (
    <>
      <Routes>
        <Route path="/*" element={<PrivateRoute Component={Home} />} />

      </Routes>
    </>
  )
}
