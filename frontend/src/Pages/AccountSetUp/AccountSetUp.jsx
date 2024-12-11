import { useState } from 'react';
import AccountSetup1 from './AccountSetUp1';
import AccountSetup2 from './AccountSetUp2';
import axios from 'axios';

function AccountSetup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    profilePicture: null,
    permanentAddress: '',
    designation: '',
    department: '',
    otherDetails: '',
    identityCode: '',
  });

  const steps = [
    <AccountSetup1
      formData={formData}
      handleNextStep={(data) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);
      }}
    />,
    <AccountSetup2
      formData={formData}
      handleNextStep={async (data) => {
        const finalData = { ...formData, ...data };
        setFormData(finalData);
        await saveDataToDatabase(finalData);
        console.log('Final Form Data:', finalData);
      }}
    />,
  ];

  const saveDataToDatabase = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      const response = await axios.post('http://localhost:5000/api/account/setup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primaryBlack">
      {steps[currentStep]}
    </div>
  );
}

export default AccountSetup;




