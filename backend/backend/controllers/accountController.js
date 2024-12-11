const Account = require('../models/account');

exports.setupAccount = async (req, res) => {
  try {
    const { firstName, lastName, phoneNo, permanentAddress, designation, department, otherDetails, identityCode } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    if (!firstName || !identityCode || !department || !designation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newAccount = new Account({
      firstName,
      lastName,
      phoneNo,
      permanentAddress,
      designation,
      department,
      otherDetails,
      identityCode,
      profilePicture
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error saving account setup:', error.message);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error.message);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};
