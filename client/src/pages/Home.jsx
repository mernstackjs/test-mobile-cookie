import React, { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [user, setUser] = useState(()=>{
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
})


const handleSubmit = (e) => {
  e.preventDefault()
  const user = {
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    email,
    createdAt: new Date().toISOString(),
    role: "user"
 
  }
localStorage.setItem("user", JSON.stringify(user))

}

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`)
      if (!response.ok) throw new Error('Failed to fetch data')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {data && (
        <>
          <p>Message: {data.message}</p>
          <p>User Agent: {data.userAgent}</p>
        </>
      )}

  
      <form className='border-2 border-gray-300 rounded-md p-4 m-auto max-w-md mt-12' onSubmit={handleSubmit}>
        <input className='border-2 border-gray-300 rounded-md p-2 m-2 w-full' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='border-2 border-gray-300 rounded-md p-2 m-2 w-full' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='border-2 bg-gray-500 text-white rounded-md p-2 m-2' type="submit">Submit</button>
      </form>

{
  user && (
    <div className='border-2 border-gray-300 rounded-md p-4 m-auto max-w-md mt-12'>
      <h1 className='text-2xl font-bold mb-4'>User</h1>
      <p>Id: {user.id}</p>
      <p className='text-gray-500'>Email: {user.email}</p>
      <p className='text-gray-500'>Created At: {user.createdAt}</p>
      <p className='text-gray-500'>Role: {user.role}</p>
    </div>
  )
}
   
    </div>
  )
}
