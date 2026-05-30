// models/User.js - This file defines the User model using Mongoose, which will be used to store user data in MongoDB.

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
