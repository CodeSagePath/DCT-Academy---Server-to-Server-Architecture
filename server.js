// Creating a server to server connection using JSONPlaceholder API and MongoDB to store the data.

import express from 'express';
import connectDB from './config/db.js'; 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
import cors from 'cors';
app.use(cors());

// Import user controller
import userController from './app/controllers/user.js';

// Define the API route for fetching user data
app.get('/api/users/:id', userController);

// Define a / route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server to Server Connection is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at http://127.0.0.1:${PORT}`));
