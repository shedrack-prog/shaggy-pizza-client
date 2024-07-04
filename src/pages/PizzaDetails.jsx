import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pizzaData } from '../data';
import SelectOptions from '../components/admin/select-options';
import { FaTimes } from 'react-icons/fa';
import { FaPlus, FaMinus } from 'react-icons/fa6';

import {
  getAllCheeses,
  getAllSauces,
  getAllVeggies,
  getCurrentUser,
  getSinglePizza,
} from '../actions/getData';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const PizzaDetails = () => {
  const { pizzaId } = useParams();
  const [singlePizza, setSinglePizza] = useState({});
  const [loading, setLoading] = useState(false);
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [qty, setQty] = useState(1);
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const getAllData = async () => {
      const res1 = await getAllCheeses();
      const res2 = await getAllSauces();
      const res3 = await getAllVeggies();
      const res4 = await getSinglePizza(pizzaId);
      const user = await getCurrentUser();
      setSinglePizza(res4);
      setUser(user);
      setCheeses([...res1]);
      setSauces([...res2]);
      setVeggies([...res3]);
    };
    getAllData();
  }, []);

  const [allSizes, setAllSizes] = useState([
    'Small',
    'Medium',
    'large',
    'Extra Large',
  ]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [pizzaSauce, setPizzaSauce] = useState([]);
  const [pizzaCheese, setPizzaCheese] = useState([]);
  const [pizzaVeggie, setPizzaVeggie] = useState([]);
  let totalAmount = singlePizza.price * qty;
  const handleClick = (name, id) => {
    if (name === 'sauces') {
      if (pizzaSauce.length === 2) {
        toast.error('Maximum of two sauces can be selected');
        return;
      }
      setPizzaSauce((s) =>
        s.includes(id) ? s.filter((item) => item !== id) : [...s, id]
      );
      return;
    } else if (name === 'cheeses') {
      if (pizzaCheese.length === 4) {
        toast.error('Maximum of four cheeses can be selected');
        return;
      }
      setPizzaCheese((s) =>
        s.includes(id) ? s.filter((item) => item !== id) : [...s, id]
      );
      return;
    } else {
      if (pizzaVeggie.length === 5) {
        toast.error('Maximum of five veggies can be selected');
        return;
      }
      setPizzaVeggie((s) =>
        s.includes(id) ? s.filter((item) => item !== id) : [...s, id]
      );
    }
  };
  const handleQty = (type) => {
    if (type === 'plus') {
      if (qty === 25) {
        toast.error('Maximum quantity cannot exceed 25');
        return;
      }
      setQty((prev) => (prev === 25 ? 25 : prev + 1));
    } else if (type === 'minus') {
      if (qty === 1) {
        toast.error('Minimum quantity must be 1');
        return;
      }
      setQty((prev) => (prev === 1 ? 1 : prev - 1));
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    if (!selectedSize) {
      toast.error('Please select a size');
      setLoading(false);
      return;
    }
    if (!pizzaCheese.length || !pizzaSauce.length || !pizzaVeggie.length) {
      toast.error('Please select at least one sauce, cheese and veggie');
      setLoading(false);
      return;
    }
    try {
      if (singlePizza.totalInStock < qty) {
        toast.error('Total in stock is less than quantity specified');
        setLoading(false);
        return;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/checkout`,
        {
          pizzaId: pizzaId,
          userId: user.user._id,
          size: selectedSize,
          qty: qty,
          // cheeses: pizzaCheese,
          // sauces: pizzaSauce,
          // veggies: pizzaVeggie,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      window.location.assign(data.url);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-[rgba(0,0,0,0.3)]">
      <div className="flex justify-center gap-[2rem] items-center  pl-[1.5rem] rounded-2xl w-[75%] mx-auto my-auto h-[90%] bg-white ">
        <div>
          <img src={singlePizza.image} alt="" className="w-[400px]" />
        </div>
        <div className="h-full w-[45%] bg-gray-50 p-[1.5rem] overflow-y-scroll">
          <h2 className="text-[28px] text-gray-900 font-light">
            {singlePizza.name}
          </h2>
          <p className="text-[14px] text-gray-700 font-extralight">
            {singlePizza.description}
          </p>
          {/* <div className="flex flex-wrap mt-[1rem]">
            <p className="px-[12px] py-[8px] rounded-md text-[13px] bg-gray-200 text-center">
              {singlePizza.sauce}
            </p>
          </div> */}
          <div>
            <h2 className="text-[18px] text-gray-900 font-medium mt-[1rem] mb-[2px]">
              Select a size
            </h2>
            <span className="flex flex-wrap gap-[10px]">
              {allSizes.map((size, index) => {
                return (
                  <span
                    onClick={() => {
                      setSelectedSize((s) => (s === size ? null : size));
                    }}
                    key={size}
                    className={` ${
                      selectedSize === size
                        ? 'bg-blue-300 text-gray-800 transition-all duration-200 cursor-pointer gap-[10px] px-[12px] text-center text-[13px] py-[8px] rounded-md'
                        : 'cursor-pointer gap-[10px] px-[12px] py-[8px] rounded-md text-[13px] bg-gray-200 text-center transition-all duration-200'
                    }`}
                  >
                    {size}
                  </span>
                );
              })}
            </span>

            <div>
              <SelectOptions
                data={sauces}
                type={pizzaSauce}
                name="sauces"
                handleClick={handleClick}
              />
              <SelectOptions
                data={cheeses}
                type={pizzaCheese}
                name="cheeses"
                handleClick={handleClick}
              />
              <SelectOptions
                data={veggies}
                type={pizzaVeggie}
                name="veggies"
                handleClick={handleClick}
              />
              <div className="flex flex-col gap-3 mt-[1rem]">
                <h2 className="text-[18px] text-gray-900 font-light">
                  Quantity:
                </h2>
                <div className=" flex gap-4 items-center ">
                  <span
                    onClick={() => handleQty('minus')}
                    className="text-[30px] px-4 bg-gray-100 rounded-full cursor-pointer"
                  >
                    <FaMinus />
                  </span>
                  <span className="text-[26px] font-bold read-only: ">
                    {qty}
                  </span>
                  <span
                    onClick={() => handleQty('plus')}
                    className="text-[30px] px-4 bg-gray-100 rounded-full cursor-pointer"
                  >
                    <FaPlus />
                  </span>
                </div>
              </div>
              <div className="flex gap-2 items-center mt-[1rem]">
                <p className="text-[27px] font-semibold read-only">Total:</p>
                <p className="text-[25px] font-medium">${totalAmount}</p>
              </div>
              <button
                type="button"
                disabled={singlePizza.totalInStock < qty}
                onClick={() => handleCheckout()}
                className="text-white w-[150px] h-[40px] text-center bg-[#FF6900] mt-[2rem] block rounded-md"
              >
                {loading ? (
                  <ClipLoader color="white" size={'24px'} className="" />
                ) : (
                  'Checkout'
                )}
              </button>
            </div>
          </div>
        </div>
        <a href="/home" className="absolute top-[2rem] right-[2rem]">
          <FaTimes
            // onClick={() => navigate('/home')}
            size={28}
            className="text-white absolute top-[2rem] right-[2rem] cursor-pointer z-50"
            // color="white cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
};

export default PizzaDetails;
