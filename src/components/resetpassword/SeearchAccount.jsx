import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Loader from '../loader';
import { toast } from 'react-toastify';

const SearchAccount = ({
  loading,
  setLoading,
  email,
  setEmail,
  Error,
  setError,
  setVisible,
  setUserInfo,
  userInfo,
}) => {
  const handleFindUser = async () => {
    setLoading(true);
    try {
      if (!email) {
        setError('Please provide your email');
        setLoading(false);
        return;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/find-user`,
        { email }
      );
      setError('');
      setUserInfo(data.user);
      console.log(userInfo);
      setVisible(1);
    } catch (error) {
      toast.error(error?.response?.data.message);
      setError(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="w-[80%] h-full">
        <div className="flex flex-col justify-around gap-[10px] h-full">
          <h4 className="text-[25px] mb-[20px]">Find your account</h4>
          <div className="pr-[1rem]">
            Please enter your email address to search for your account. You can
            cancel the search by clicking cancel button.
          </div>
          <input
            className="w-[80%] border-[1px] placeholder:text-[15px] border-gray-600 px-[10px] py-[10px] mt-[10px]"
            type="text"
            name="email"
            value={email}
            placeholder="Registered email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {Error && <span className="text-red-500 text-[14px]"> {Error} </span>}

          <div className="flex justify-between items-center w-[80%] mx-auto mt-[5rem]">
            <Link
              to="/login"
              className="text-[17px] text-gray-900 px-[17px] text-center rounded-md w-[160px]  py-[8px] bg-gray-200"
            >
              Cancel
            </Link>
            <button
              onClick={() => handleFindUser()}
              className="bg-[#FF6900] px-[25px] py-[10px] text-white rounded-md"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAccount;
