import React, { useEffect, useState } from 'react';
import OrderTable from '../components/orders/table';
import { getAllOrders } from '../actions/getData';
import { toast } from 'react-toastify';

const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllOrders();

        setData(response);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    getData();
  }, []);
  return (
    <div className="">
      <OrderTable data={data} />
    </div>
  );
};

export default Orders;
