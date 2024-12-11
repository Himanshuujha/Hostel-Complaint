import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import NotificationsDropdown from './Notifiaction';

const Header = ({ heading }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();
    const { profileImg } = useSelector((state) => state.account);
    const [profileImage, setProfileImage] = useState(profileImg?.url || '/img/profile.jpg');

    useEffect(() => {
        setProfileImage(profileImg?.url || '/img/profile.jpg');
    }, [profileImg]);

    const toggleNotifications = () => {
        if (!showNotifications) {
            setShowNotifications(true);
        }
    };

    const notifications = [
        {
            title: "Hey Your meet has been scheduled",
            description: "More description goes here and it can be very...",
            date: "4.4.2019; 13:44"
        },
        {
            title: "Hey Your meet has been scheduled",
            description: "More description goes here and it can be very...",
            date: "4.4.2019; 13:44"
        },
        {
            title: "Hey Your meet has been scheduled",
            description: "More description goes here and it can be very...",
            date: "4.4.2019; 13:44"
        }
    ];

    const notificationCount = notifications.length;

    return (
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-2 bg-primaryBlack border-b-2 border-secondaryBlack h-16 lg:h-24">
            <h1 className="text-white text-3xl font-semibold ml-2 mb-4 lg:mb-0">{heading}</h1>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="ml-0 lg:ml-4 flex justify-center items-center space-x-4 lg:space-x-8 p-2 mr-6">
                    <div
                        className='bg-secondaryBlack rounded-full w-12 h-12 flex items-center justify-center relative cursor-pointer'
                        onClick={toggleNotifications}
                    >
                        <BellIcon className='text-white h-6 w-6' />
                        {notificationCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primaryBlack bg-primaryGreen rounded-full">
                                {notificationCount}
                            </span>
                        )}
                        {showNotifications && <NotificationsDropdown notifications={notifications} setShowNotifications={setShowNotifications} />}
                    </div>
                    <div className='flex items-center cursor-pointer' onClick={() => navigate('/dashboard/settings')}>
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="h-12 w-12 rounded-full text-white"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
