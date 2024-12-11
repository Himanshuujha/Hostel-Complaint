// src/components/InfoBox.jsx
import React from 'react';

const InfoBox = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
        </div>
    );
};

export default InfoBox;
