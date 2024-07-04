import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex items-center flex-col ">
        <h1 className="text-[36px] text-gray-900 font-medium">
          Checkout Success
        </h1>
        <span className="text-[18px]">Your purchase was successful...</span>
        <p>Your order is being processed.</p>
        <span>Thank you for your purchase</span>
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

export default CheckoutSuccess;
