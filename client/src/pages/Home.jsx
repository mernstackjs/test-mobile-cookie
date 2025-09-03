import React from 'react'

export default function Home() {
  console.log(import.meta.env.VITE_API_URL )
  const testData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`)
    const data = await response.json()
    console.log(data)
  }
  testData()
  return (
    <div>Home</div>
  )
}
