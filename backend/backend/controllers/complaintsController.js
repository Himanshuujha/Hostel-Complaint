const Account = require('../models/account');
const Complaint = require('../models/complaint');
const sendMessage = require('../utils/sendMessage');

exports.registerComplaint = async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body);
        await newComplaint.save();

        res.status(201).json(newComplaint);
    } catch (error) {
        console.error('Error registering complaint:', error.message);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error.message);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        await Complaint.findByIdAndDelete(id);

        res.status(200).json({ message: 'Complaint deleted successfully.' });
    } catch (error) {
        console.error('Error deleting complaint:', error.message);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

exports.sendComplaintMessage = async (req, res) => {
    try {
        const { category, phoneNo ,rollNo,issue,roomNo} = req.body;

        // Fetch contacts for the department matching issueCategory
        const staffContacts = await Account.find({
            department: category,
            designation: 'Staff Member',
        }).select('phoneNo');

        // Fetch contacts for the Reception department
        const receptionContacts = await Account.find({
            department: 'Reception',
        }).select('phoneNo');

        // Fetch contacts for Higher Authorities
        const higherAuthorityContacts = await Account.find({
            designation: 'Higher Authority',
        }).select('phoneNo');

        const contacts = [
            ...staffContacts,
            ...receptionContacts,
            ...higherAuthorityContacts,
        ];

        const message = `Complaint for ${category} having Problem (${issue}). Please reach to Room No. ${roomNo},Phone No:${phoneNo} `;

        // Send the message to all contacts
        contacts.forEach(contact => {
            sendMessage(contact.phoneNo, message);
        });

        res.status(201).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};
