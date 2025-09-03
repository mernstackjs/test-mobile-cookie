require('dotenv').config({path: '.env.local'})
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World', userAgent: req.headers['user-agent'] })
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})