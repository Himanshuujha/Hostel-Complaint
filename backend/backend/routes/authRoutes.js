const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../controllers/authController');
const { requireSignIn } = require('../middleware/auth');

router.post('/signup', registerController);
router.post('/signin', loginController);
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

module.exports = router;
