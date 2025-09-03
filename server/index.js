require('dotenv').config({path: '.env.local'})
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World', userAgent: req.headers['user-agent'] })
})



app.post("/set-user", (req, res) => {
try {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Generate user object
  const user = {
    id: Math.random().toString(36).substring(2, 15),
    email,
    password,
    createdAt: new Date().toISOString(),
    role: "user",
  };

  // Set cookie with proper settings for production
  res.cookie("user", JSON.stringify(user), {
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site in production
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/', // Available on all paths
  });

  res.status(201).json({ message: "User stored in cookie", user });

} catch (error) {
  res.status(500).json({ message: "server error", error:error.message })
}
});

app.get("/get-user", (req, res) => {
  const userCookie = req.cookies.user;
  
  // Debug logging for production
  console.log("All cookies:", req.cookies);
  console.log("User cookie:", userCookie);
  console.log("Request headers:", req.headers);

  if (!userCookie) {
    return res.status(404).json({ 
      message: "No user cookie found",
      debug: {
        allCookies: req.cookies,
        userAgent: req.headers['user-agent'],
        origin: req.headers.origin,
        referer: req.headers.referer
      }
    });
  }

  try {
    const user = JSON.parse(userCookie);
    res.status(200).json({ message: "User retrieved", user });
  } catch (err) {
    res.status(400).json({ message: "Invalid cookie data" });
  }
});

app.get("/test-cookie", (req, res) => {
  const userCookie = req.cookies.user;

  if (!userCookie) {
    return res.status(404).json({ message: "No user cookie found" });
  }

  try {
    const user = JSON.parse(userCookie);
    res.status(200).json({ message: "Cookie test successful", user });
  } catch (err) {
    res.status(400).json({ message: "Invalid cookie data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})



