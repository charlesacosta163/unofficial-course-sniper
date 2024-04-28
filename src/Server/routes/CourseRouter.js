import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sendEmail from "./email.js";

dotenv.config();

const API_URL = process.env.API_URL;
const localURL = "http://localhost:5000/";

// Course Controller
const router = Router();
router.use(cors({origin: "http://localhost:5173"}))

// Fetch all courses via search term (WORKING)
router.get("/api/courses/search", async (req, res) => {
  // Course search endpoint
  const { title } = req.query; // Gets the user's search term
  const url = `${API_URL}api/courses/search`;

  try {
    const response = await fetch(
      url + "?" + new URLSearchParams({ title, page: 0, size: 10 })
    );

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      console.log(response);
      console.log("Failed to fetch course data");
      throw new Error(`Failed to fetch course data: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching course data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/api/courses", async function (req, res) {
  try {
    const response = await fetch(`${API_URL}api/courses`);
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    res.status(404).json({ msg: "Something went wrong" });
  }
});

router.get("/api/courses/:id", async function (req, res) {
  try {
    const { id } = req.params;

    const response = await fetch(`${API_URL}api/courses/${id}`);
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    res.status(404).json({ msg: "Course not found" });
  }
});

// Sending email experiment
router.post("/api/courses", async function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Include Cookies
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Include Cookies
  try {
    if (!req.user) 
      return res.status(403).json({msg: "You are not logged in"})

    await sendEmail(req, res, next);

    // Optionally, send a response back indicating success
    return res
      .status(200)
      .json({ message: "Course added successfully and email sent!" });
  } catch (error) {
    // Error handling
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
