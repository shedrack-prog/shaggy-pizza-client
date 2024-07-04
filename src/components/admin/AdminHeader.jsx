import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div
      className=" flex items-center justify-center h-[60px] shadow-sm
    fixed  top-0 right-0 left-[300px] z-[9999] bg-white"
    >
      <div className="flex justify-between items-center px-[20px] w-[98%]">
        <h2 className="text-[#FF6900] text-[27px] cursor-pointer font-medium ">
          <FaTimes />
        </h2>
        <div className="flex items-center font-light gap-x-[4rem]">
          <Link to={'/home'} className="text-[#FF6900] text-[18px] font-light">
            Exit
          </Link>
          <button
            className="bg-[#FF6900] text-white text-[16px]
          px-[13px] py-[7px] font-light rounded-full text-center"
          >
            Welcome
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
