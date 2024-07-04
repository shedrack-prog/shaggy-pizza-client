import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!email) {
      toast.error('please provide email ');
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error('please provide password');
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/admin/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success(data.message);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 3000);
      return;
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading && <Loader />}
      <div className="flex items-center justify-center h-[70%]">
        <div className="flex flex-col">
          <h1 className="text-[37px] font-semibold">Login as Admin</h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-[3rem]">
            <input
              type="text"
              name={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-[2rem] border-[1px] border-gray-300 w-[400px]
              px-[6px] py-4 focus:border-gray-300 bg-white text-[17px]"
            />
            <input
              type="password"
              value={password}
              name={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="
            border-[1px] border-gray-300 w-[400px]
              px-[6px] py-4 focus:border-gray-300 bg-white text-[17px]"
            />
            <button
              disabled={loading}
              type="submit"
              className="px-[12px] py-[8px] bg-[#FF6900] w-[50%] mt-[1rem] rounded-md text-white"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
