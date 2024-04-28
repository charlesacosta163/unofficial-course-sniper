import express, { Router } from 'express'
import { body } from 'express-validator'
import { validationResult } from 'express-validator'
import passport from 'passport'
import dotenv from 'dotenv'
import cors from 'cors';
import { hashPassword } from './helpers.js'

dotenv.config()

const API_URL = process.env.API_URL
const localURL = 'http://localhost:5000/'

// Students Controller  
const router = Router()
router.use(cors({origin: "http://localhost:5173"}))

// Fetch all users (WORKING)
router.get("/api/students", async (req, res) => {
    try {
        const response = await fetch(`${API_URL}api/students`)
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.log('An error occurred', error);
    }
})

router.post("/api/students/login", passport.authenticate("local"), function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.user) {
        res.json({ msg: "Auth success", user: req.user })
    }
    else {
        res.json({ msg: "Auth failed" })
    }
})

router.get("/api/students/logout", function (req, res) {
    req.logout(err => {
        if (err) {
            // Handle error if logout fails
            console.error(err);
            res.status(500).json({ message: 'Logout failed' }); // Internal Server Error
        } else {
            // Send a JSON response indicating successful logout
            req.session.destroy()
            res.status(200).json({ message: 'Logout successful' });
        }
    })
})

router.get("/api/students/status", function (req, res) {
    if (req.user)
        res.json({ msg: "You are logged in", user: req.user })

    else
        res.json({ msg: "You are not logged in" })
})

// Fetch the user's info (WORKING)
router.get('/api/students/:id', async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);

        const student = await fetch(`${API_URL}api/students/${studentId}`);
        const data = await student.json();

        res.json(data);

    } catch (error) {
        console.error('Error fetching student information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Creating accounts endpoint (WORKING)
router.post("/api/students", [
    body("firstName")
        .notEmpty().withMessage("First name must not be empty")
        .isString(),

    body("lastName")
        .notEmpty().withMessage("Last name must not be empty")
        .isString(),

    body("email")
        .notEmpty().withMessage("Email must not be empty")
        .isEmail().withMessage("Must be a valid email"),

    body("password")
        .notEmpty().withMessage("Password must not be empty")
        .isString()
        .isLength({min: 7}).withMessage("Password must be minimum of 7 characters")

],  async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty())
            return res.status(400).json({msg: "Account creation failed", errors: errors.array()})

        const { body } = req

        body.password = hashPassword(body.password)
        
        // Make HTTP request to save student data
        const response = await fetch(`${API_URL}api/students`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        });

        // Check if the response indicates success
        if (response.ok) {
            // Send success response with the request body
            res.status(201).json({ message: "Account created successfully!" });
        } else {
            // Parse error response
            const data = await response.json();
            // Send error response with error message from the server
            res.status(response.status).json({ error: data.error || 'Unknown error' });
        }

    } catch (error) {
        console.error("Error creating account", error);
        // If an error occurs, send error response
        res.status(500).json({ error: 'Internal server error' });
    }

})

// DELETE account in Profile.jsx (WORKING)
router.delete('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params

        const response = await fetch(`${API_URL}api/students/${id}`, {
            method: "DELETE"  
        })


        if (response.ok) {
            req.session.destroy()
            return res.sendStatus(200);
        } else {
            throw new Error('Failed to delete account');
        }

    } catch (err) {

        res.status(500).json({ message: "Unsuccessful deletion of account!" })
    }
})


export default router