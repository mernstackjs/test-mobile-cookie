import React, { useEffect, useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userCookie, setUserCookie] = useState(null)
  const [userLocalStorage, setUserLocalStorage] = useState(()=>{
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    }
try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/set-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // This is crucial for cookies to work
    body: JSON.stringify(user),
  })
  
  if(!res.ok){
    const errorData = await res.json()
    console.log("Error:", errorData)
    return
  }
  
  const data = await res.json()
  localStorage.setItem("user", JSON.stringify(data.user))
  console.log("Success:", data)
  
  
} catch (error) {
  console.log("Network error:", error)
}
  }

  const fetchUser = async()=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/get-user`, {
      credentials: "include",
    })
    const data = await res.json()
    setUserCookie(data.user)
    console.log("User:", data)
  }
  const fetchUserLocalStorage = async()=>{
    const user = localStorage.getItem("user")
    setUserLocalStorage(user ? JSON.parse(user) : null)
  }
  useEffect(()=>{
    fetchUser()
    fetchUserLocalStorage()
  },[])
  console.log("User Local Storage:", userLocalStorage)
  return (
    <div>
      <h1>Home</h1>
      <form className='m-auto max-w-md mt-12 border-2 border-gray-300 rounded-md p-4' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold italic center mb-4'>Set Data Into Cookie</h1>
        <input className='w-full p-2 rounded-md border-2 border-gray-300' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='w-full p-2 rounded-md border-2 my-3 border-gray-300' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className=' p-2 rounded-md border-2 border-gray-300' type='submit'>Submit</button>
      </form>

      {
        userCookie && (
          <div className='m-auto max-w-md mt-12 bg-green-300 rounded-md p-4'>
        
        <h1 className='text-2xl font-bold italic center mb-4'>User Information From Cookie</h1>
        <p className='mb-2 italic text-sm text-gray-500' >{userCookie.id}</p>
            <p className='text-sm text-gray-500'>Email: {userCookie.email}</p>
            <p className='text-sm text-gray-500'>Password: {userCookie.password}</p>
            <p className='text-sm text-gray-500'>Created At: {userCookie.createdAt}</p>
            <p className='text-sm text-gray-500'>Role: {userCookie.role}</p>
          </div>
        )
      }

      {
        userLocalStorage && (
          <div className='m-auto max-w-md mt-12 border-2 bg-slate-700 text-white rounded-md p-4'>
            <h1 className='text-2xl font-bold italic center mb-4'>User Info From Local Storage</h1>
            <p className='mb-2 italic text-sm text-gray-500' >{userLocalStorage.id}</p>
            <p className='text-sm text-gray-500'>Email: {userLocalStorage.email}</p>
            <p className='text-sm text-gray-500'>Password: {userLocalStorage.password}</p>
            <p className='text-sm text-gray-500'>Created At: {userLocalStorage.createdAt}</p>
            <p className='text-sm text-gray-500'>Role: {userLocalStorage.role}</p>
          </div>
        )
      }
    </div>
  )
}
