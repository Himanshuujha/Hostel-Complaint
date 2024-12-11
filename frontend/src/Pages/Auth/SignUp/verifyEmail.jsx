// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function VerifyEmail() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState('Verifying...');

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const token = query.get('token');

//     if (token) {
//       fetch(`/api/auth/verify-email?token=${token}`, {
//         method: 'GET',
//       })
//         .then(response => response.json())
//         .then(data => {
//           if (data.msg) {
//             setMessage(data.msg);
//             setTimeout(() => {
//               navigate('/auth/sign-in');
//             }, 3000);
//           } else {
//             setMessage('Verification failed. Invalid token.');
//           }
//         })
//         .catch(() => {
//           setMessage('Verification failed. Please try again later.');
//         });
//     } else {
//       setMessage('Invalid verification link.');
//     }
//   }, [location.search, navigate]);

//   return (
//     <div className="text-center text-white mt-10">
//       <h3 className="text-2xl font-bold">{message}</h3>
//     </div>
//   );
// }

// export default VerifyEmail;
