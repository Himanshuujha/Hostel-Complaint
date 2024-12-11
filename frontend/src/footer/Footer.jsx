import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowUp } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerStyle = {
    backgroundColor: 'primaryBlack',
    color: 'primaryGreen',
    width: '100%', // Less width
    margin: '0 auto', // Centered
    // padding: '20px 0', // Padding from top and bottom
  };

  const arrowStyle = {
    transition: 'transform 0.3s ease-in-out',
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'translateY(-5px)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
  };

  return (
    <footer style={footerStyle} className="  text-center  bg-primaryBlack  mb-0">
      <div
        className="bg-gray-600 text-white cursor-pointer flex justify-center items-center mb-3 mt-0"
        onClick={handleScrollToTop}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ ...arrowStyle, padding: '10px 20px' }} // Padding from left and right
      >
        <HiArrowUp className="text-2xl mr-2" />
        <span>Back to Top</span>
      </div>
      <div className="flex justify-evenly space-x-8">
        <div className="footer-section">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul>
            <li><a href="#announcements" className="hover:underline">Announcements</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
            <li><Link to="/link3" className="hover:underline">Staff</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="text-lg font-semibold">Hostel Information</h4>
          <ul>
            <li><Link to="https://www.google.com/maps/place/Teja+Singh+Hall,+Boys+Hostel+6,+BH6/@30.7633228,76.7669415,17.32z/data=!4m6!3m5!1s0x390ff35f43ba73ff:0xc9723480d879a03d!8m2!3d30.7642332!4d76.7649497!16s%2Fg%2F11kpf86f28?entry=ttu" className="hover:underline">Location</Link></li>
            <li><Link to="/link5" className="hover:underline">Events</Link></li>
            <li><a href="#gallery" className="hover:underline">Gallery</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="text-lg font-semibold">Student Resources</h4>
          <ul>
            <li><Link to="https://hostels.puchd.ac.in/hostel-handbook-2019.pdf" className="hover:underline">Student Handbook</Link></li>
            <li><Link to="./components" className="hover:underline">Fee Structure</Link></li>
            <li><Link to="https://hostels.puchd.ac.in/hostel-form-2024.pdf" className="hover:underline">Hostel Form</Link></li>
          </ul>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="flex justify-center mt-2 space-x-4 mb-2">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
      <hr />
      <p className="m-0 text-green-500">© 2024 Boys hostel 6. All rights reserved.</p>
    </footer>
  );
}

export default Footer;