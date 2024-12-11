import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AccountSetup2({ formData, handleNextStep }) {
  const [designation, setDesignation] = useState(formData?.designation || "");
  const [department, setDepartment] = useState(formData?.department || "");
  const [otherDetails, setOtherDetails] = useState(formData?.otherDetails || "");
  const [identityCode, setIdentityCode] = useState(formData?.identityCode || "");
  const navigate = useNavigate();

  // Event Handlers
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
    setDepartment(""); // Reset department when designation changes
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleOtherDetailsChange = (e) => {
    setOtherDetails(e.target.value);
  };

  const handleIdentityCodeChange = (e) => {
    setIdentityCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!designation || !department || !identityCode) {
      alert("Please fill in all required fields.");
      return;
    }

    const data = {
      designation,
      department,
      otherDetails,
      identityCode,
    };
    handleNextStep(data);
    navigate('/auth/sign-in');
  };

  const renderDepartmentOptions = () => {
    const options = {
      Student: ["UIET", "UICET", "UILS", "UBS", "UIHM"],
      "Staff Member": ["Technician", "Cleaning", "Mess", "Security", "Gardening", "Parking", "Personal", "Reception", "Others"],
      "Higher Authority": ["Assistant Warden", "Warden", "Cashier"],
    };

    return options[designation]?.map((option) => (
      <option key={option} value={option}>{option}</option>
    )) || <option value="">Select Department</option>;
  };

  return (
    <div className="flex flex-col items-start justify-center mt-8 max-h-screen px-4 sm:px-16 md:px-32">
      <div className="mb-8">
        <p className="text-3xl font-bold text-white">
          Tell us Connection Details
        </p>
        <p className="text-customGray mt-2">
          Share your details to complete the setup.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-screen-md">
        {/* Designation */}
        <div className="mb-6">
          <label htmlFor="designation" className="text-white text-base font-medium">
            Designation*
          </label>
          <select
            id="designation"
            value={designation}
            onChange={handleDesignationChange}
            className="mt-2 p-3 w-full bg-secondaryBlack text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGreen transition"
            required
          >
            <option value="">Select Designation</option>
            <option value="Student">Student</option>
            <option value="Staff Member">Staff Member</option>
            <option value="Higher Authority">Higher Authority</option>
          </select>
        </div>

        {/* Department */}
        <div className="mb-6">
          <label htmlFor="department" className="text-white text-base font-medium">
            Department*
          </label>
          <select
            id="department"
            value={department}
            onChange={handleDepartmentChange}
            className="mt-2 p-3 w-full bg-secondaryBlack text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGreen transition"
            required
          >
            {renderDepartmentOptions()}
          </select>
        </div>

        {/* Identity Code */}
        <div className="mb-6">
          <label htmlFor="identityCode" className="text-white text-base font-medium">
            Identity Code*
          </label>
          <input
            id="identityCode"
            type="text"
            placeholder="234-4/17 or AadharNo"
            value={identityCode}
            onChange={handleIdentityCodeChange}
            className="mt-2 p-3 w-full bg-secondaryBlack text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGreen transition"
            required
          />
        </div>

        {/* Other Details */}
        <div className="mb-6">
          <label htmlFor="otherDetails" className="text-white text-base font-medium">
            If 'Other' selected, please specify
          </label>
          <textarea
            id="otherDetails"
            value={otherDetails}
            onChange={handleOtherDetailsChange}
            placeholder="Please add your description"
            className="mt-2 p-3 w-full bg-secondaryBlack text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGreen transition resize-none"
            style={{ height: "100px" }}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-start">
          <button
            type="submit"
            className="p-3 bg-primaryGreen text-primaryBlack font-bold rounded-lg hover:bg-green-600 transition lg:w-[15%]"
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountSetup2;
