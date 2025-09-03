import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Header from './components/Header'

export default function App() {
  return (
    <div>
<Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}
