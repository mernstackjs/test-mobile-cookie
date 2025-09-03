import React, { useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [time, setTime] = useState(null)
  const showTime = () => {
    setTime(new Date().toLocaleTimeString())
  }
  console.log(import.meta.env.VITE_API_URL )
  const testData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`)
    const data = await response.json()

    setData(data)
  }
  console.log("data", data)
  console.log("--------------------------------")
  console.log("--------------------------------")
  console.log("message", data?.message)
  console.log("--------------------------------")
  console.log("userAgent", data?.userAgent)
  console.log("--------------------------------")
  console.log("-----------i made some changes------------")
  testData()
  return (
    <div>
      <h1 className='text-2xl font-bold'>Home</h1>
      <p>{data?.message}</p>
      <p>{data?.userAgent}</p>

      <p>i made some changes</p>

      <span>Today is {new Date().toLocaleDateString()}</span>

      <button onClick={testData}>Test Data</button>
      <button onClick={() => {
    console.log("this is a game changer")
      }}>Game Changer</button>

      <h1>This Year is very important for me</h1>

      <button onClick={showTime}>Show Time</button>
      <p>{time}</p>
    </div>
  )
}
