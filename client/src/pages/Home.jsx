import React, { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

      <p className="mt-4">I made some changes</p>
      <span>Today is {new Date().toLocaleDateString()}</span>

      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => console.log('This is a game changer!')}
        >
          Game Changer
        </button>
      </div>

      <h1 className="mt-6 font-semibold text-lg">
        This year is very important for me
      </h1>
    </div>
  )
}
