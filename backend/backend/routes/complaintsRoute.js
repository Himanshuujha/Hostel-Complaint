const express = require('express');
const router = express.Router();
const { registerComplaint, getAllComplaints, deleteComplaint, sendComplaintMessage } = require('../controllers/complaintsController');

router.post('/register', registerComplaint);
router.get('/', getAllComplaints);
router.delete('/:id', deleteComplaint);
router.post('/sendComplaintMessage', sendComplaintMessage); 

module.exports = router;
