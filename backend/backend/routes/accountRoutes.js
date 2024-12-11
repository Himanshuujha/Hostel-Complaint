const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { setupAccount, getAllAccounts } = require('../controllers/accountController.js');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/setup', upload.single('profilePicture'), setupAccount);
router.get('/setup', getAllAccounts);

module.exports = router;
