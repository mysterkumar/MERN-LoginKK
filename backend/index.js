const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const Authrouter = require('./Routes/AuthRouter');
const Productrouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

// CORS Configuration
const corsOptions = {
    origin: 'https://mern-login-kk-ui.vercel.app', // Correct frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions)); // Apply CORS globally
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', Authrouter);
app.use('/products', Productrouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
