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

// Define route to proxy requests to the external API
app.get('/api/courses/search', (req, res) => {  // Course search endpoint
  const { searchTerm } = req.query;   // Gets the user's search term
  console.log('Search term:', searchTerm); // Log the search term received from the client
  fetch(`https://psyched-camp-404208.nn.r.appspot.com/course-sniper/api/courses/search?title=${searchTerm}`)  // Fetches all courses based on the substring
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              console.log('Failed to fetch course data');
              throw new Error('Failed to fetch course data');
          }
      })
      .then(data => {
          console.log('Received course data:', data); // Log the data received from the external API
          res.json(data);
      })
      .catch(error => {
          console.error('Error fetching course data:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
