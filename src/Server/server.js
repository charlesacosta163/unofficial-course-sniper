import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Define route to proxy requests to the external API
app.get('/api/courses', (req, res) => {
  const { searchTerm } = req.query;
  console.log('Search term:', searchTerm); // Log the search term received from the client
  fetch(`https://psyched-camp-404208.nn.r.appspot.com/course-sniper/api/courses/search?title=${searchTerm}`)
      .then(response => {
          if (response.ok) {
              return response.json();
            } else {
              console.log(response);
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