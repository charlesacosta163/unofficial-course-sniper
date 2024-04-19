import express, { Router } from 'express'
import dotenv from 'dotenv'
import cors from 'cors';


dotenv.config()

const API_URL = process.env.API_URL
const localURL = 'http://localhost:5000/'

// Course Controller
const router = Router()
router.use(cors())

// Fetch all courses via search term (WORKING)
router.get('/api/courses/search', async (req, res) => {  // Course search endpoint
    const { title } = req.query;   // Gets the user's search term
    console.log('Search term:', title); // Log the search term received from the client
    const url = `${API_URL}api/courses/search`
  
    try {
      const response = await fetch(url + "?" + new URLSearchParams({ title, page: 0, size: 10 }))
  
      if (response.ok) {
        const data = await response.json();
        console.log('Received course data:', data); // Log the data received from the external API
        res.json(data);
      } else {
        console.log(response);
        console.log('Failed to fetch course data');
        throw new Error(`Failed to fetch course data: ${response.status}`);
      }
  
    }
  
    catch (error) {
      console.error('Error fetching course data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



export default router