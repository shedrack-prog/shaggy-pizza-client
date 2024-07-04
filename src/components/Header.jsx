import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyOrder from './my-orders/my-order';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from './loader';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,

        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success('Logged out successfully');
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error('error logging you out!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <MyOrder {...{ visible, setVisible }} />
      <div
        className=" flex items-center justify-center h-[60px] shadow-md
      fixed z-[9999] top-0 right-0 left-0 backdrop-blur-md"
      >
        <div className="flex justify-between items-center px-[20px] w-[80%]">
          <h2 className="text-[#FF6900] text-[27px] font-bold ">
            Shaggy Pizza
          </h2>
          <div className="flex items-center font-light gap-x-[4rem]">
            <Link
              to={'/admin/login'}
              className="text-[#FF6900] text-[18px] font-light"
            >
              Admin
            </Link>
            <button
              onClick={() => setVisible((prev) => !prev)}
              className="bg-[#FF6900] text-white text-[16px]
            px-[13px] py-[6px] font-light rounded-full text-center"
            >
              My orders
            </button>
            <span
              onClick={() => handleLogout()}
              className="text-blue-400 text-[15px] cursor-pointer hover:text-blue-300 transition-all duration-150"
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
