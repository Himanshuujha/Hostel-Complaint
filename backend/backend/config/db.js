const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    // Log the URI to ensure it's being loaded correctly
    console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
    
    // Check if the URI is empty
    if (!process.env.MONGO_URI) {
      console.error('MongoDB URI is not defined in the .env file');
      process.exit(1);
    }
    
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Success message
    console.log('MongoDB Connected...');
  } catch (err) {
    // Detailed error message
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
