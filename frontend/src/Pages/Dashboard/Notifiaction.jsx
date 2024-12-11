import React, { useEffect, useState } from 'react';

const NotificationsDropdown = ({ notifications, setShowNotifications }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => setShowNotifications(false), 300); // Matches the transition duration
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '50px', // Adjusted to avoid overlap with the bell icon
                right: '10px',
                width: '500px',
                backgroundColor: '#182736',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                zIndex: 50,
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#5cff85',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginTop: '-8px',
                    }}
                    onClick={handleClose}
                >
                    Close
                </button>
            </div>
            <div className="space-y-6">
                {notifications.map((notification, index) => (
                    <div key={index} className="p-3 bg-primaryBlack rounded-lg flex justify-between items-center border-l-8 border-primaryGreen">
                        <div className='flex flex-col gap-2 w-[70%]'>
                            <h4 className="text-white mt-2">{notification.title}</h4>
                            <p className="text-gray-400 text-sm">{notification.description}</p>
                        </div>
                        <span className="text-gray-400 ml-4 w-[30%] mt-9">{notification.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsDropdown;
