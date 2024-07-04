import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/loader';

const ActivateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    verifyAccount();
  }, []);

  const verifyAccount = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/activate-account`,
        {
          token,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setSuccess(data.message);
      setTimeout(() => {
        navigate('/home');
      }, 7000);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      setTimeout(() => {
        navigate('/home');
      }, 7000);
      console.log(error);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div>
        <div>
          {success && (
            <div>
              <h1>Thank you. Your email has been verified successfully</h1>
            </div>
          )}

          {
            <div>
              {error && (
                <div>
                  <h1>{error}</h1>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default ActivateAccount;
