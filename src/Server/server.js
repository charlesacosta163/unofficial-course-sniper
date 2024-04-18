// Make sure to install these before running
// Install express.js: npm install express
// Install cors: npm install cors
// Install node-fetch: npm install node-fetch

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv'

import CourseRouter from './routes/CourseRouter.js' // Course controller
import StudentRouter from './routes/StudentRouter.js' // Student controller

import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import "./strategies/local-strategy.js"

dotenv.config()
const app = express();

// Enable CORS
app.use(cors());
app.use(cookieParser("sucky"))
app.use(session({
    secret: "suckysucky",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))


// Enable express.json
app.use(express.json())

// Passport.js initializers
app.use(passport.initialize())
app.use(passport.session())

app.use(CourseRouter)
app.use(StudentRouter)

const PORT = parseInt(process.env.PORT) || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

