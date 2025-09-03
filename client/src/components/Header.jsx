import React from 'react'
import { Link } from 'react-router' 
export default function Header() {
  const isAuthenticated = false
  return (
    <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <h1>Header</h1>
      <nav className='flex gap-4'>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </nav>
    </div>
  )
}
