import React from 'react';
import { FaCloud } from "react-icons/fa";
import { SiAwsorganizations } from "react-icons/si";

const SupportedByCompanies = () => {
  return (
    <div className="bg-black py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-white text-lg font-medium mb-4">
            Supported by many companies <span className='text-lime-500'>around the globe</span>
          </p>
          <div className="flex flex-wrap justify-center font-bold items-center gap-6">
            {/* Use <span> elements for the icons/placeholders, adjust as needed */}
            <span className="text-gray-400 text-2xl">agency</span>
            <span className="text-gray-400  gap-1 text-2xl flex">
              <span className='mt-2'>
              <FaCloud />
              </span> 
              application
            </span>
            <span className="text-gray-400 text-2xl">business</span>
            <span className="text-gray-400 text-2xl">company</span>
            <span className="text-gray-400  gap-1 text-2xl flex">
              <span className='mt-2'>
              <SiAwsorganizations />
              </span> 
              organizations
            </span>
            <span className="text-gray-400 text-2xl">venture</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportedByCompanies;
