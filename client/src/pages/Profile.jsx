import React, { useEffect } from 'react'

export default function Profile() {

  const fetchTestCookie = async()=>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/test-cookie`)
    const data = await response.json()
    console.log(data)
  }
  useEffect(()=>{
    fetchTestCookie()
  },[])
  return (
    <div>Profile</div>
  )
}
