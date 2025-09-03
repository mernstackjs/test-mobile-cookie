import React from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  console.log(import.meta.env.VITE_API_URL )
  const testData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`)
    const data = await response.json()
    console.log(data)
    setData(data)
  }
  testData()
  return (
    <div>
      <h1>Home</h1>
      <p>{data?.message}</p>
      <p>{data?.userAgent}</p>
    </div>
  )
}
