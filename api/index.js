/* 
This file sets up a basic web server using Node.js and the Express framework. 
Configures Express to serve static files from the public directory.
Defines an endpoint to fetch event data from SerpApi and return it as JSON.
*/
const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, 'credentials', '.env') });
const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch events
app.get('/api/events', async (req, res) => {
    /* Extracts the city parameter from the query string of the incoming request (ex: /events?city=Austin) */
    const city = req.query.location;
    const apiKey = f0380c1a62fee7a6d0ba21cf7a29b5cb5765d955e7c41957740180329b9003da;
    /* Constructs the URL for the SerpApi request, including the city parameter and API key. 
       encodeURIComponent(city) ensures that the city name is safely encoded for inclusion in the URL. */
    const url = `https://serpapi.com/search?engine=google_events&q=Events+in+${encodeURIComponent(city)}&hl=en&gl=us&api_key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Serves the index.html file from the public directory when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//module.exports = app;
// Starts the server on the specified port and logs a confirmation message
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});