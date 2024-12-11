const mongoose = require('mongoose');

// Defining the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Checking if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
