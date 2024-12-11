const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  permanentAddress: { type: String },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  otherDetails: { type: String },
  identityCode: { type: String, required: true },
  profilePicture: { type: String },
  contact: { type: String } 
});

const Account = mongoose.modelNames().includes('Account') 
  ? mongoose.model('Account') 
  : mongoose.model('Account', accountSchema);

module.exports = Account;
