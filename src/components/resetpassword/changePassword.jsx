import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../loader';

const ChangePassword = ({
  loading,
  setLoading,
  userInfo,
  setVisible,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const navigate = useNavigate();
  const { email } = userInfo;
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password || !confirmPassword || !userInfo.email) {
      toast.error('Please provide all values.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/change-password`,
        {
          email: userInfo.email,
          password,
          confirmPassword,
        }
      );
      setLoading(false);
      toast.success(data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data.message);
      setLoading(false);
      return;
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div>
        <div>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-900 w-[80%] px-[5px] py-[13px] mt-[1.5rem] rounded-md border-[1px] border-gray-700"
              placeholder="New password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-gray-900 w-[80%] px-[5px] py-[13px] mt-[1.5rem] rounded-md border-[1px] border-gray-700"
              placeholder="Confirm Password"
            />
            <div className="mt-[5rem] flex justify-between w-[70%] items-center">
              <Link to={'/login'} className="text-[18px] text-gray-900">
                Cancel
              </Link>
              <button
                type="submit"
                className="text-blue-500 text-[18px] font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
