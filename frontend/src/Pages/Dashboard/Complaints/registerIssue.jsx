import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterIssue = ({ addIssue }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [issue, setIssue] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const navigate = useNavigate();
  const newIssue = {
    category: selectedCategory,
    issue,
    rollNo,
    roomNo,
    PhoneNo,
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (issue.length > 300) {
      alert('Issue description should not exceed 300 words.');
      return;
    }
    // Call the backend API to register the complaint
    const response = await fetch('http://localhost:5000/api/complaints/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIssue),
    });

    if (response.ok) {
      addIssue(newIssue);
    } else {
      console.error('Failed to register complaint');
    }
    try {
      await fetch('http://localhost:5000/api/complaints/sendComplaintMessage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              category:selectedCategory,
              phoneNo: PhoneNo,
          }),
      });
      console.log('Message sent successfully');
  } catch (error) {
      console.error('Failed to send message:', error);
  }
    // Reset the state
    setSelectedCategory(null);
    setIssue('');
    setRollNo('');
    setRoomNo('');
    setPhoneNo('');


    navigate('/dashboard/complaints');
  };
//   const handleComplaintButtonClick = async (e) => {
//     e.preventDefault();
    
// };

  const categoryColors = {
    'Technician': '#FF5733',
    'Cleaning': '#33C1FF',
    'Mess': '#FF33AB',
    'Security': '#33FF57',
    'Gardening': '#8A33FF',
    'Parking': '#FFD700',
    'Personal': '#FF5733',
    'Others': '#C70039',
  };

  return (
    <section className="p-6">
      <h2 className="text-white text-2xl font-semibold mb-4">Register Your Issue</h2>
      <div className="flex gap-4 mb-4">
        {['Technician', 'Cleaning', 'Mess', 'Security', 'Gardening', 'Parking', 'Personal', 'Others'].map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className="px-4 py-2 rounded-md"
            style={{ backgroundColor: categoryColors[category] }}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <form onSubmit={handleSubmit} className="bg-secondaryBlack p-4 rounded-md">
          <textarea
            className="w-full p-2 mb-4 rounded-md"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            placeholder="Type your issue"
            maxLength="300"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          />
          <input
            type="text"
            className="w-full p-2 mb-4 rounded-md"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            placeholder="Roll No (Optional)"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 rounded-md"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            placeholder="Room No (Optional)"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 rounded-md"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            placeholder="Your Phone Number"
            value={PhoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
          <button type="submit"  className="bg-primaryGreen text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </form>
      )}
    </section>
  );
};

export default RegisterIssue;