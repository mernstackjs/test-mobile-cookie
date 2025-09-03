import React, { useEffect, useState } from 'react'

export default function Profile() {
  const [id, setId] = useState("")
  const [idCookie, setIdCookie] = useState("")

const handleSetIdCookie = async(e)=>{
  e.preventDefault();
  const response = await fetch(`${import.meta.env.VITE_API_URL}/set-id-cookie`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
    credentials: "include",
  })
  const data = await response.json()
  console.log(data)
}

const fetchIdCookie = async()=>{
  const response = await fetch(`${import.meta.env.VITE_API_URL}/get-id-cookie`, {
    credentials: "include",
  })
  const data = await response.json()
  console.log("id form cookie", data)
  setIdCookie(data.id)
}
console.log(id)
useEffect(()=>{
  fetchIdCookie()
},[])
  return (
    <div>
    <h1>Profile</h1>
    <form className='m-auto max-w-md mt-12 border-2 border-gray-300 rounded-md p-4' onSubmit={handleSetIdCookie}>
      <h1 className='text-2xl font-bold italic center mb-4'>Set Id Cookie</h1>
      <input className='w-full p-2 rounded-md border-2 border-gray-300' type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button className='p-2 rounded-md border-2 border-gray-300 my-2' type="submit">Set Id Cookie</button>
    </form>
    {
      idCookie && (
        <div className='m-auto max-w-md mt-12 border-2 border-gray-300 rounded-md p-4'>
          <h1 className='text-2xl font-bold italic center mb-4'>Id Cookie</h1>
          <p className='text-sm text-gray-500'>{idCookie}</p>
        </div>
      )
    }
    </div>
  )
}
