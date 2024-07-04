import axios from 'axios';
import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Loader from '../loader';

const SendResetCode = ({
  loading,
  Error,
  setLoading,
  setError,
  email,
  setVisible,
  userInfo,
  setUserInfo,
  message,
  setMessage,
}) => {
  const sendEmailHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/send-reset-code`,
        {
          email,
        }
      );
      setLoading(false);
      setMessage(data.message);
      setVisible(2);
      setError('');
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div>
        <div>
          <div className="text-[20px] text-gray-900">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email hover1" className="flex gap-2">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
            </div>
          </label>

          <div>
            <div className="flex gap-[1rem] mt-[20px] items-center">
              {/* <img src={userInfos.picture} alt="" /> */}
              <span>
                <img
                  className="w-[100px] h-[100px]"
                  src={userInfo.picture}
                  alt=""
                />
              </span>
              <div className="flex flex-col gap-[5px]">
                <span className="text-[20px] font-medium">{userInfo.name}</span>
                <span className="text-gray-900 text-[15px]">
                  {userInfo.email}{' '}
                </span>
              </div>
            </div>

            <div className="mt-[3rem] flex justify-between w-[70%]">
              <span
                onClick={() => setVisible(0)}
                className=" text-gray-[900] cursor-pointer text-[16px]"
              >
                Not you?
              </span>
              <button
                type="submit"
                className="text-blue-500 "
                onClick={() => sendEmailHandler()}
              >
                {loading ? (
                  <ScaleLoader color="#fff" loading={loading} size={25} />
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendResetCode;
