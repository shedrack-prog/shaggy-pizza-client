import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../../actions/getData';
import { toast } from 'react-toastify';
import { FaTentArrowTurnLeft } from 'react-icons/fa6';

const MyOrder = ({ visible, setVisible }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!. Try again later');
      }
    };
    getData();
  }, []);
  return (
    <div
      className={`${
        visible
          ? 'absolute p-3 z-[99999] bg-[#fff] max-w-[350px] left-0 top-0 bottom-0 transition-all duration-300 shadow-md overflow-y-scroll'
          : 'absolute p-3 z-[99999] bg-[#fff] max-w-[350px] left-[-1000px] top-0 bottom-0 transition-all duration-300 shadow-md'
      }`}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="text-[26px] font-light">My Orders</h1>
          <span>
            <FaTentArrowTurnLeft
              size={28}
              onClick={() => setVisible((prev) => !prev)}
              className="text-gray-800 cursor-pointer"
            />
          </span>
        </div>
        <div className=" flex flex-col gap-[2rem] mt-[2rem] ">
          {orders.length < 1 ? (
            <h1>You have not placed any order yet.</h1>
          ) : (
            orders.map((item) => (
              <div
                key={item._id}
                className="shadow-sm rounded-md flex gap-3 border-b-[1px] border-gray-300 pb-2  "
              >
                <span>
                  <img
                    src={item.productImage}
                    alt="Pizza image"
                    className="max-w-[90px]"
                  />
                </span>
                <div>
                  <p className="text-[17px] font-semibold ">
                    {item.productName}
                  </p>
                  <span className="text-[13px] font-extralight w-[100%]">
                    {item.description}
                  </span>
                  <p className="text-[13px] flex gap-2 font-semibold  mt-3 mb-3">
                    Total paid:
                    <span>$ {item.totalPaid / 100}</span>
                  </p>
                  <span className="text-muted-foreground mb-2">
                    quantity: {item.quantity}
                  </span>
                  <p
                    className={`${
                      item.status === 'In the Kitchen'
                        ? 'bg-blue-400 text-white  font-mono read-only text-center rounded-sm text-[15px] py-[2px] w-[210px]'
                        : item.status === 'Canceled'
                        ? 'bg-red-400 text-white font-mono read-only text-center rounded-sm text-[15px] py-[2px] w-[210px]'
                        : item.status === 'Dispatched'
                        ? 'bg-gray-700 text-white  font-mono read-only text-center rounded-sm text-[15px] py-[2px] w-[210px]'
                        : item.status === 'Not Processed'
                        ? 'bg-yellow-300 text-white  font-mono read-only text-center rounded-sm text-[15px] py-[2px] w-[210px]'
                        : 'bg-green-500 text-white  font-mono read-only text-center rounded-sm text-[15px] py-[2px] w-[210px]'
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
