// // In complaintController.js

// const Account = require('../models/account');
// const complaints=require('../models/complaint')
// const sendMessage = require('../utils/sendMessage'); // Assuming you have a utility to send messages

// exports.hittingComplaint = async (req, res) => {
//   try {
//     const { category, phoneNo } = req.body;

//     // Fetch contacts for the department matching issueCategory
//     const staffContacts = await Account.find({
//       department: category,
//       designation: 'Staff Member',
//     }).select('phoneNo');

//     // Fetch contacts for the Reception department
//     const receptionContacts = await Account.find({
//       department: 'Reception',
//     }).select('phoneNo');

//     // Fetch contacts for Higher Authorities
//     const higherAuthorityContacts = await Account.find({
//       designation: 'Higher Authority',
//     }).select('phoneNo');

//     const contacts = [
//       ...staffContacts,
//       ...receptionContacts,
//       ...higherAuthorityContacts,
//     ];

//     const message = `Complaint for ${issueCategory} by ${phoneNo}`;

//     // Send the message to all contacts
//     contacts.forEach(contact => {
//       sendMessage(contact.phoneNo, message);
//     });

//     res.status(201).json({ message: 'Complaint registered and messages sent.' });
//   } catch (error) {
//     console.error('Error registering complaint:', error.message);
//     res.status(500).json({ message: 'Server error, please try again later.' });
//   }
// };
