const mongoose = require('mongoose');

// Define the Complaint schema
const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'Technician', 'Cleaning', 'Mess', 'Security', 'Gardening','Reception' ,
      'Parking', 'Personal', 'Others'
    ]
  },
  issue: {
    type: String,
    required: true,
    maxlength: 300  // Optional: Enforcing a maximum length for the issue description
  },
  rollNo: {
    type: String,
    trim: true,
    default: ''  // Optional: Default value if not provided
  },
  roomNo: {
    type: String,
    trim: true,
    default: ''  // Optional: Default value if not provided
  },
  PhoneNo: {
    type: String,
    default: ''  // Optional: To store OTP if needed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Checking if the model already exists before defining it
const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
