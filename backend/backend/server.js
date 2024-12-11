const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const complaintRoutes = require('./routes/complaintsRoute'); // Add this line
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger);
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/complaints', complaintRoutes); // Add this line
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
