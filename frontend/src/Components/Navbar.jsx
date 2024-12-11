import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between transition-all duration-300 ${scrolled ? 'bg-gray-900' : 'hidden'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center ml-5">
          <Link to="/" className="flex items-center ">
            <img
              src="https://puchd.ac.in/asset/pu-logo.png"
              height="80"
              width="80"
              className="inline-block"
              alt="Panjab University Logo"
            />
            <div className="ml-4 max-w-xs">
              <h1 className="text-2xl font-bold text-primaryGreen drop-shadow-lg">TEJA SINGH HALL</h1>
              <h1 className="text-primaryGreen">
                BOYS HOSTEL-6 (Panjab University)
                <br />
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/auth/sign-in"
            className="bg-green-300 text-black px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/auth/sign-up"
            className="bg-green-300 text-black px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;