import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

function AccountSetup1({ formData, handleNextStep }) {
  const [firstName, setFirstName] = useState(formData?.firstName || '');
  const [lastName, setLastName] = useState(formData?.lastName || '');
  const [phoneNo, setPhoneNo] = useState(formData?.phoneNo || '');
  const [permanentAddress, setPermanentAddress] = useState(formData?.permanentAddress || '');
  const [profilePicture, setProfilePicture] = useState(formData?.profilePicture || null);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNoChange = (e) => setPhoneNo(e.target.value);
  const handlePermanentAddressChange = (e) => setPermanentAddress(e.target.value);

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhoneNo(phoneNo)) {
      alert('Please enter a valid phone number');
      return;
    }

    const data = {
      firstName,
      lastName,
      phoneNo,
      permanentAddress,
      profilePicture,
    };
    handleNextStep(data);
  };

  const validatePhoneNo = (phone) => {
    const phoneRegex = /^[0-9-+()\s]{10,15}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className="flex flex-col md:items-start justify-center mt-5 max-h-screen sm:mx-32">
      <div className="mb-9">
        <p className="text-3xl font-bold text-white">
          Tell us a bit about you
        </p>
        <p className="text-customGray mt-2">
          This will help us better set up your account
        </p>
      </div>

      <div className="flex flex-col items-start">
        <div className="mr-4 mb-6 flex flex-col">
          <div>
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="ml-3 mb-2 w-16 h-16 text-primaryGrey" />
            )}
            <label htmlFor="profilePicture" className="text-white text-base font-medium mb-1 mt-2">
              Profile Picture
            </label>
          </div>

          <div>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-2 file:bg-primaryGreen text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>

      <form
        className="mt-8 mb-2 max-w-screen-lg w-full"
        onSubmit={handleSubmit}
      >
        <div className="md:flex justify-between">
          <div className="mb-6 md:w-1/2">
            <label htmlFor="firstName" className="text-white text-base font-medium mb-1">
              First name*
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="Neilson"
              className="w-full p-3 bg-secondaryBlack border-none text-white rounded-lg mt-1 hover:border-primaryGreen"
              required
              aria-label="First name"
            />
          </div>

          <div className="mb-6 md:ml-5 md:w-1/2">
            <label htmlFor="lastName" className="text-white text-base font-medium mb-1">
              Last name*
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Wang"
              className="w-full p-3 bg-secondaryBlack border-none text-white rounded-lg mt-1"
              required
              aria-label="Last name"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="phoneNo" className="text-white text-base font-medium mb-1">
            Phone No.*
          </label>
          <input
            id="phoneNo"
            type="tel"
            value={phoneNo}
            onChange={handlePhoneNoChange}
            placeholder="123-456-7890"
            className="w-full p-3 bg-secondaryBlack border-none text-white rounded-lg mt-1"
            required
            aria-label="Phone number"
            pattern="^[0-9-+()\s]{10,15}$"
            title="Please enter a valid phone number"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="permanentAddress" className="text-white text-base font-medium mb-1">
            Permanent Address
          </label>
          <input
            id="permanentAddress"
            type="text"
            value={permanentAddress}
            onChange={handlePermanentAddressChange}
            placeholder="123 Main St, City, Country"
            className="w-full p-3 bg-secondaryBlack border-none text-white rounded-lg mt-1"
            aria-label="Permanent Address"
          />
        </div>

        <div className="flex items-center justify-start">
          <button
            type="submit"
            className="mt-1 p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg lg:w-[15%]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSetup1;
