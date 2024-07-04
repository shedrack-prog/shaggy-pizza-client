import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/loader';

export const loader = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/get-current-user`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    toast.info('Session expired. Please login again.');
    console.log(error);
    return redirect('/login');
  }
};

const HomeLayout = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllPizzas = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/pizzas`,
        {
          withCredentials: true,
        }
      );
      setPizzas(data);
      setLoading(false);
    };
    fetchAllPizzas();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className=" ">
        <div className="">
          <div className="mt-[80px] w-[90%] flex items-center justify-center mx-auto ">
            <Header />
            <div className="w-full flex flex-wrap gap-[3rem] justify-center z-0">
              {pizzas.map((item) => {
                const { _id, name, description, price, image } = item;

                return (
                  <div
                    key={_id}
                    className="flex flex-col items-center w-[270px]"
                  >
                    <img
                      src={image}
                      alt="pizza image"
                      className="max-w-[210px] max-h-[210px] object-cover z-0 hover:scale-105 transition-all duration-200"
                    />
                    <div className="w-[90%]">
                      <h2 className="text-[18px] font-medium ">{name}</h2>
                      <span className="text-gray-600 text-[14px]">
                        {description}
                      </span>
                      <div className="flex text-[18px] font-semibold mt-[10px] gap-[1px] mb-[1rem]">
                        $<p className="">{price}</p>
                      </div>
                      <Link
                        to={`/pizzas/${_id}`}
                        className="text-[15px] px-[20px] py-[8px] rounded-md font-medium bg-[#FFD2B3] text-gray-900"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
