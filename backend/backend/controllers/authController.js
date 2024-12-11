// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/helper');
require('dotenv').config();

// const signup = async (req, res, next) => {
//   const { username, email, phoneNumber, password } = req.body;
//   console.log('Request Body:', req.body);

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Additional logging
//     console.log('Creating new user...');
//     user = new User({
//       username,
//       email,
//       phoneNumber,
//       password
//     });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     console.log('User created successfully');

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error('Signup error:', err); // Log the error
//     next(err);
//   }
// };
const registerController = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;
    // validations
    if (!username) {
      return res.send({ message: "Userame is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phoneNumber) {
      return res.send({ message: "Phone is Required" });
    }
   
    //check user
    const existingUser = await User.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// const signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(200).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(200).json({ msg: 'Invalid credentials' });
//     }

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.status(201).json({ token });
//       }
//     );
//   } catch (err) {
//     console.log(err)
//   }
// };
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    //Validation
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        username: user.username,
        email: user.email,
        phoneNmber: user.phoneNumber,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController
};
