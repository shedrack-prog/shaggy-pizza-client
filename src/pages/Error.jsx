import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../assets/images/404-error.svg';

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[35px] font-medium mb-5">Uh Oh</h1>
        <img src={NotFound} alt="" className="h-[200px]" />
        <p className="text-[40px] font-semibold text-green-400 mt-[1rem]">
          Page Not Found
        </p>

        <Link
          to={'/home'}
          className="text-blue-400 text-[20px] font-light hover:text-blue-300 transition-all duration-150"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Error;
