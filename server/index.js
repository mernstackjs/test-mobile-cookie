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

  // Set cookie with mobile-friendly settings
  res.cookie("user", JSON.stringify(user), {
    httpOnly: false, // allow client-side JS to read it
    secure: true,    // required on HTTPS
    sameSite: "none", // required for cross-site cookies
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
  

  res.status(201).json({ message: "User stored in cookie", user });

} catch (error) {
  res.status(500).json({ message: "server error", error:error.message })
}
});

app.post("/set-id-cookie", (req, res)=>{
  const { id } = req.body;
  res.cookie("idahmed", id, {
    httpOnly: true,
    secure: true,

  })
  res.status(201).json({ message: "Id stored in cookie", id });
})

app.get("/get-id-cookie", (req, res)=>{
  const id = req.cookies.idahmed;
  res.status(200).json({ message: "Id retrieved from cookie", id });
})

app.get("/get-user", (req, res) => {
  const userCookie = req.cookies.user;
  
  // Enhanced debug logging for mobile troubleshooting
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  console.log("=== GET-USER DEBUG ===");
  console.log("Is Mobile:", isMobile);
  console.log("User Agent:", userAgent);
  console.log("All cookies:", req.cookies);
  console.log("User cookie:", userCookie);
  console.log("Origin:", req.headers.origin);
  console.log("Referer:", req.headers.referer);
  console.log("Accept:", req.headers.accept);
  console.log("=====================");

  if (!userCookie) {
    return res.status(404).json({ 
      message: "No user cookie found",
      debug: {
        isMobile: isMobile,
        allCookies: req.cookies,
        userAgent: userAgent,
        origin: req.headers.origin,
        referer: req.headers.referer,
        accept: req.headers.accept,
        cookieHeader: req.headers.cookie
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







app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})



