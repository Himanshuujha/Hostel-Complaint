import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

const Spinner = ({ path = "/auth/sign-in", seconds = 6 }) => {
  const [countdown, setCountdown] = useState(seconds);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(interval);
      navigate(path,{
        state:location.pathname
      }); // Redirect after countdown
    }

    return () => clearInterval(interval);
  }, [countdown, navigate, path,location]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      
      {/* Countdown Timer */}
      <div className="mt-4 text-lg text-gray-600">
        Redirecting in {countdown} {countdown === 1 ? 'second' : 'seconds'}...
      </div>
    </div>
  );
};

export default Spinner;

