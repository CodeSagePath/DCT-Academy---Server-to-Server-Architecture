// user.js - Controller for handling user-related operations

import User from '../models/User.js';
import axios from 'axios';

const userController = async (req, res) => {
  try {
    // Step 1: Extract user ID from the request parameters
    const userId = req.params.id;

    // Step 2: Check local MongoDB for the user
    let user = await User.findOne({ userId });

    if (user) {
      // Step 3: User found locally
      return res.json(user);
    }

    // Step 4: User not found locally, fetch from external API
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (response.status === 200) {
      const { id, name, email, address } = response.data;
      const city = address.city;

      // Step 5: Save the new user data to MongoDB
      user = new User({ userId: id, name, email, city });
      await user.save();

      // Step 6: Send the newly saved record back to the client
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'User not found in external API' });
    }
  } catch (error) {
    console.error('Error in user controller:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default userController;
