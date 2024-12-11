import React from 'react';
import { DotGroup } from '../../Components/Dot';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import LeftSide from '../../Components/LeftSide';
import { useNavigate } from 'react-router-dom';
// import DotGroup from '../../components/Dot';

const AccountSetupLayout = ({ stepNumber, children, handlePreviousStep }) => {
    const navigate = useNavigate();
    const progressWidth = `${(stepNumber / 2) * 100}%`;

    const handleArrowClick = () => {
        if (stepNumber > 1) {
            handlePreviousStep();
        } else {
            navigate('/auth/sign-in');
        }
    };

    return (
        <section className="relative bg-secondaryBlack flex">
            <LeftSide />
            <div className="mmd:left-[38%] w-full mmd:w-[62%] p-10 mmd:absolute overflow-hidden bg-secondaryBlack min-h-screen">
                <div className="hidden fixed top-1 left-[38%] ml-5 mmd:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="hidden fixed top-1 left-[38%] ml-1.5 mmd:flex flex-col space-y-2">
                    <DotGroup />
                </div>
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-2xl font-bold">Account set up</h3>
                    <p className="font-bold text-primaryGreen mt-1 mr-2 text-2xl">{stepNumber}/2</p>
                </div>
                <div className="w-full bg-white h-2 mt-4 rounded-lg">
                    <div className="bg-primaryGreen h-2 rounded-lg" style={{ width: progressWidth }}></div>
                </div>
                <ArrowLeftIcon className="text-gray-100 w-5 h-5 mt-5 ml-1 cursor-pointer" onClick={handleArrowClick} />
                {children}
            </div>
        </section>
    );
};

export default AccountSetupLayout;
