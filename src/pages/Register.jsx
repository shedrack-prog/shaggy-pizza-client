import React, { useState } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/loader';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!name || !email || !password || !confPassword) {
      toast.error('Please provide all values');
      setLoading(false);
      return;
    }
    if (password !== confPassword) {
      toast.error('passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success('Registration completed!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
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
          <h1 className="text-[37px] font-semibold">Register</h1>
          {error && <p className="text-red-500 text-15px">{error}</p>}
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-[2.3rem]"
          >
            <input
              type="text"
              name={name}
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="mt-[2rem] border-[1px] border-gray-300 w-[400px]
              px-[6px] py-4 focus:border-gray-300 bg-white text-[17px]"
            />
            <input
              type="text"
              name={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className=" border-[1px] border-gray-300 w-[400px]
              px-[6px] py-4 focus:border-gray-300 bg-white text-[17px]"
            />
            <input
              type="password"
              name={password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="
            border-[1px] border-gray-300 w-[400px]
              px-[6px] py-4 focus:border-gray-300 bg-white text-[17px]"
            />
            <input
              type="password"
              value={confPassword}
              name={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="Confirm password"
              className="
            border-[1px] border-gray-300 w-[400px]
              px-[6px] py-4 focus:border-gray-300 bg-white text-[17px]"
            />
            <button
              // onClick={() => handleRegister()}
              disabled={loading}
              type="submit"
              className="px-[12px] py-[8px] bg-[#FF6900] w-[50%] rounded-md text-white"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      <span className="mt-[1.5rem]">
        Already have an account?
        <Link className="text-blue-500 " to={'/login'}>
          Login
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
