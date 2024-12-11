import React from 'react';
import { BigDotGroup, DotGroup } from './Dot';
import HomeSlide from './HomeSlide';

const LeftSide = () => {
    return (
        <div className="hidden mmd:flex w-[38%] bg-primaryBlack fixed top-0 left-0 h-full p-10 flex-col justify-between z-50">
            <div className="hidden md:flex absolute top-1 right-0 mr-[1px]">
                <DotGroup />
            </div>
            <div className="absolute top-1 right-4">
                <DotGroup />
            </div>
            <div className="absolute top-1 right-8">
                <DotGroup />
            </div>
            <div>
           <div className='flex items-center'> <img
            src="https://puchd.ac.in/asset/pu-logo.png"
            height="80"
            width="80"
            className="inline-block"
            alt="Panjab University Logo"
          />
          <div className="ml-4 max-w-xs">
            <h1 className="text-2xl font-bold text-green-300 drop-shadow-lg">TEJA SINGH HALL</h1>
            <h1 className="text-green-300">
              BOYS HOSTEL-6 (Panjab University)
              <br />
            </h1>
          </div>
          </div>
                <div className="mt-16">
                    <h1 className="text-white text-4xl font-bold mb-2">Start your remarkable</h1>
                    <h1 className="text-primaryGreen text-4xl font-bold">journey with us!</h1>
                </div>
            </div>
            {/* <HomeSlide /> */}
            <div className="relative h-full">
                <div className="absolute flex justify-center bottom-16 -left-4">
                    <BigDotGroup />
                </div>
                <div className="absolute flex justify-center bottom-4 -left-4">
                    <BigDotGroup />
                </div>
                <div className="absolute flex justify-center -bottom-8 -left-4">
                    <BigDotGroup />
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
