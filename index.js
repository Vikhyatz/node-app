const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const port = 3000;

dotenv.config();

let access_token = ''; // Declare a global variable to store the access_token

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Define routes for different button clicks
app.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email'; // Add the required scopes

    res.redirect(
        `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${encodeURIComponent(
            scopes
        )}&redirect_uri=${encodeURIComponent(
            process.env.REDIRECT_URI
        )}`
    );
});

app.get('/callback', async (req, res) => {
    const { code } = req.query;

    const data = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    };

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        access_token = response.data.access_token; // Store the access_token in the variable

        res.sendFile(path.join(__dirname, 'public', 'main.html'));
    } catch (error) {
        console.error('Error during token exchange:', error.message);
        res.status(500).send('An error occurred during authorization.');
    }
});

app.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term;

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
            headers: {
                Authorization: `Bearer ${access_token}`, // Use the stored access_token
            },
        });

        // const searchData = response.data.tracks.items.map(item => {
        //     return {
        //         name: item.name,
        //         artist: item.artists.map(artist => artist.name).join(', '),
        //         album: item.album.name,
        //         previewUrl: item.preview_url,
        //     };
        // });
        const searchData = response.data.tracks.items

        res.json(searchData);
    } catch (error) {
        console.error('Error making search request:', error.message);
        res.status(500).send('An error occurred while making the search request.');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});