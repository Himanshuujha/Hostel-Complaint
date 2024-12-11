import axios from 'axios';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { DotGroup } from "../../../Components/Dot";
import LeftSide from "../../../Components/LeftSide";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [validity, setValidity] = useState({
    lowercase: false,
    number: false,
    uppercase: false,
    specialChar: false,
    minLength: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // useNavigate hook

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsTypingPassword(true);
    setValidity({
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      uppercase: /[A-Z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      minLength: value.length >= 8,
    });
  };

  const isFormValid = () => {
    const isValidPassword = Object.values(validity).every(Boolean);
    return email && username && phoneNo && isValidPassword;
  };

  const handlePhoneNumberKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    const isNumberKey = /^[0-9]+$/.test(e.key);

    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      setError(null);
      try {
        const payload = {
          email,
          username,
          phoneNumber: phoneNo, 
          password
        };
        const response = await axios.post('http://localhost:5000/api/auth/signup', payload, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });
  
        // if (response.status === 200) {
        //   setIsSubmitted(true);
        //   // Navigate to SignIn page with success message
        //   navigate('/auth/sign-in', { state: { message: 'Successful Signup' } });
        // } else {
        //   setError(response.data.message || 'An error occurred');
        // }
        if(response && response.data.success){
          setIsSubmitted(true);
          alert(response.data && response.data.message)
          setTimeout(() => {
            
            navigate("/accountsetup",{ state: { message: 'Successful Signup' } });
          }, 100);
        } 
        else{
          setError(response.data.message)
        }
      } catch (err) {
        console.error('Axios error:', err.response || err.message); // Log Axios error
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <section className="bg-secondaryBlack mmd:flex-1 mmd:flex-row relative">
      <LeftSide />
      <div className="mmd:left-[38%] w-full bg-secondaryBlack mmd:w-[62%] p-10 overflow-x-hidden absolute min-h-screen flex-grow">
        <div>
          <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          {isSubmitted ? (
            <div className="text-center text-white mt-10">
              <h3 className="text-2xl font-bold">Registration Successful</h3>
              <p>You can now log in with your new account.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-secondaryBlack">
              <div className="text-center">
                <h3 className="text-white text-2xl font-bold mb-4">Sign up with free trial</h3>
                <p className="text-sm font-normal text-gray-400">Empower your experience, sign up for a free account today</p>
              </div>
              <form onSubmit={handleSubmit} className="mb-2 w-auto md:w-[60%] mt-4">
                {error && (
                  <div className="text-red-500 text-center mb-4">{error}</div>
                )}
                <div className="mb-6">
                  <label className="text-white text-base font-medium">Email*</label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="text-white text-base font-medium">Username*</label>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter your username"
                    className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="text-white text-base font-medium">Phone Number*</label>
                  <input
                    type="text"
                    value={phoneNo}
                    onChange={handlePhoneNoChange}
                    onKeyDown={handlePhoneNumberKeyDown}
                    maxLength={10}
                    placeholder="Enter your phone number"
                    className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                    required
                  />
                </div>
                <div className="mb-6 relative">
                  <label className="text-white text-base font-medium">Password*</label>
                  <div className="relative mt-1">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Create a password"
                      className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 text-white"
                    >
                      {passwordVisible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {isTypingPassword && (
                    <div className="text-gray-400 mt-2">
                      <p className="flex items-center">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${validity.lowercase ? 'text-green-500' : 'text-gray-400'}`} />
                        One lowercase character
                      </p>
                      <p className="flex items-center">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${validity.number ? 'text-green-500' : 'text-gray-400'}`} />
                        One number
                      </p>
                      <p className="flex items-center">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${validity.uppercase ? 'text-green-500' : 'text-gray-400'}`} />
                        One uppercase character
                      </p>
                      <p className="flex items-center">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${validity.specialChar ? 'text-green-500' : 'text-gray-400'}`} />
                        One special character
                      </p>
                      <p className="flex items-center">
                        <CheckCircleIcon className={`h-5 w-5 mr-2 ${validity.minLength ? 'text-green-500' : 'text-gray-400'}`} />
                        Minimum 8 characters
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-primaryGreen text-white p-3 rounded-lg font-medium mt-6"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
                <p className="text-sm font-normal text-gray-400 mt-4">
                  Already have an account? <Link to="/auth/sign-in" className="text-primaryGreen">Sign In</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SignUp;
