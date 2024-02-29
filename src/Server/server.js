// Make sure to install these before running
// Install express.js: npm install express
// Install cors: npm install cors
// Install node-fetch: npm install node-fetch

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Enable express.json
app.use(express.json())

// Fetch all courses via search term
app.get('/api/courses/search', async (req, res) => {  // Course search endpoint
  const { title } = req.query;   // Gets the user's search term
  console.log('Search term:', title); // Log the search term received from the client
  const url = 'https://psyched-camp-404208.nn.r.appspot.com/course-sniper/api/courses/search'

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

// Fetch all users
app.get("/api/students", async (req, res) => {
  try {
    const response = await fetch('https://psyched-camp-404208.nn.r.appspot.com/course-sniper/api/students')
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log('An error occurred', error);
  }
})


// Fetch the user's info 
app.get('/api/students/:id', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);

    const student = await fetch(`https://psyched-camp-404208.nn.r.appspot.com/course-sniper/api/students/${studentId}`);
    const data = await student.json();

    res.json(data);
    
  } catch (error) {
    console.error('Error fetching student information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Updates the target courses for the user
app.put('api/students/:id', async (req, res) => {
  try {
    const {
      body,
      params: { id }
    } = req

    const studentId = parseInt(id)

    const response = await fetch(`https://psyched-camp-404208.nn.r.appspot.com/course-sniper/api/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...body})
    });

    if (response.ok) {
      const updatedStudent = await response.json();
      res.status(200).json({ message: 'Target courses updated successfully', student: updatedStudent });
    } else if (response.status === 404) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      throw new Error('Failed to update target courses');
    }
  } catch (error) {
    console.error('Error updating target courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

})


// Creating accounts endpoint

app.post("/api/students", async (req, res) => {
  try {
    const { body } = req
    // Make HTTP request to save student data
    const response = await fetch('https://psyched-camp-404208.nn.r.appspot.com/course-sniper/api/students', {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
