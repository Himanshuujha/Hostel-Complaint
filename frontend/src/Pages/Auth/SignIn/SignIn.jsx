import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import LeftSide from "../../../Components/LeftSide";
import { DotGroup } from "../../../Components/Dot";
import axios from "axios";
import { useAuth } from "../context";

function SignIn() {
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location=useLocation();
  const [auth, setAuth] = useAuth();


  const handleUsernameChange = (e) => {
    setWorkEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const handleSubmitLogin = async(e) => {
  //   e.preventDefault();
  //   // const response = await axios.post('http://localhost:5000/api/auth/signin')
  //   // const token=await response.json();
  //   // localStorage.setItem(token);
  
  //   // console.log("Login submitted");

  //   // After successful login
  //   navigate("/accountsetup");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/signin',
        { email:workEmail, password }
      );
      if (res && res.data.success) {
        console.log(res.data.token);
        alert(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
          navigate("/dashboard");
        
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <section className="bg-grey-600 flex flex-col mmd:flex-row">
      <LeftSide />
      <div className="mmd:left-[38%] bg-secondaryBlack absolute flex-grow w-full p-10 mmd:w-[62%] overflow-x-hidden overflow-hidden min-h-screen">
        <div>
          <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
            <DotGroup />
          </div>
          <div className="flex flex-col items-center justify-center bg-secondaryBlack">
            <div className="text-center mt-10">
              <h3 className="text-2xl text-white font-bold mb-4">Sign In to your Account</h3>
              <p>{error}</p>
              <p className="text-sm font-normal text-gray-400">Welcome back! Please enter your credentials to log in.</p>
            </div>

            <form className="mb-2 w-auto md:w-[60%] mt-4" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="text-white text-base font-medium">Work Email*</label>
                <input
                  type="email"
                  value={workEmail}
                  onChange={(e) => {
                    setWorkEmail(e.target.value);
                  }}
                  placeholder="Enter Work Email"
                  className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="text-white font-medium">Password*</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full p-3 bg-primaryBlack border-none text-white rounded-lg mt-1"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <EyeSlashIcon className="h-5 w-5 text-primaryGreen" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center justify-center">
                  <input type="checkbox" id="keep-me" className="mr-2" />
                  <label htmlFor="keep-me" className="text-customGray text-sm">Keep me Logged in</label>
                </div>
                <Link to="/auth/forget-password" className="text-primaryGreen text-sm">Forgot Password?</Link>
              </div>
              <button type="submit" className="mt-6 w-full p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg">
                Login
              </button>
              <div className="flex justify-center items-center my-6">
                <div className="bg-customGray ml-2 mr-2 w-[40%] h-0.5"></div>
                <p className="text-white">Or</p>
                <div className="bg-customGray mr-2 ml-2 w-[40%] h-0.5"></div>
              </div>
              <button
                className="mt-4 flex items-center justify-center w-full p-3 bg-white text-primaryBlack font-bold rounded-lg gap-2"
              >
                Sign in with Google <img src="/img/Google.png" alt="Google Icon" />
              </button>
              <p className="text-center text-white font-medium mt-4">
                Don't have an account?
                <Link to="/auth/sign-up" className="text-primaryGreen ml-1">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
