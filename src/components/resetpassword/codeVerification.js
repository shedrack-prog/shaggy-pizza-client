import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../loader';

const CodeVerification = ({
  loading,
  setLoading,
  code,
  message,
  setMessage,
  setCode,
  error,
  setError,
  userInfo,
  setVisible,
}) => {
  // const [active, setActive] = useState(false)
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!userInfo.email) {
      toast.error('Please go back to find your account first');
      setLoading(false);
      return;
    }
    if (!code) {
      toast.error('Please provide a code');
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/validate-reset-code`,
        {
          code,
          email: userInfo.email,
        }
      );
      setLoading(false);
      toast.success('Code verified successfully');
      setVisible(3);
      setError('');
      setMessage('');
    } catch (error) {
      toast.error(error?.response?.data.message);
      setError(error?.response?.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div>
        <div>
          <h1 className="text-[18px] text-gray-900">Code Verification</h1>

          <span>
            <p>Please enter the code being sent to your email.</p>
          </span>
          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-gray-900 w-[80%] px-[5px] py-[13px] mt-[1.5rem] rounded-md border-[1px] border-gray-700"
              placeholder="Code"
            />
            {/* <span>
              Didn't get a code <button>Resend</button>
            </span> */}
            <div className="mt-[5rem] flex justify-between w-[70%] items-center">
              <Link to={'/login'} className="text-[18px] text-gray-900">
                Cancel
              </Link>
              <button
                type="submit"
                className="text-blue-500 text-[18px] font-medium"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CodeVerification;
