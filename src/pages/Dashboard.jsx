import React, { useEffect, useState } from 'react';
import AdminCard from '../components/admin/AdminCard';
import { FiDollarSign } from 'react-icons/fi';
import { FaRegCreditCard } from 'react-icons/fa6';
import { GiFullPizza } from 'react-icons/gi';
import { getTotalSales } from '../actions/get-total-sales';
import { getTotalRevenue } from '../actions/get-total-revenue';
import { getGraphData } from '../actions/get-graph-data';
import { getTotalPizzas } from '../actions/get-total-pizzas';
import Loader from '../components/loader';
import Overview from '../components/admin/graph';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState();
  const [totalSales, setTotalSales] = useState();
  const [totalPizzas, setTotalPizzas] = useState();
  const [graphData, setGraphData] = useState();
  const [loading, setLoading] = useState(false);

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const res1 = await getTotalSales();
      const res2 = await getTotalRevenue();
      const res3 = await getGraphData();
      const res4 = await getTotalPizzas();
      setTotalSales(res1);
      setTotalRevenue(res2);
      setGraphData(res3);
      setTotalPizzas(res4);
      console.log(totalSales, totalRevenue, graphData, totalPizzas);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="w-[calc(100vw-320px)] flex items-center  pt-[1.5rem] px-2">
        <div className="w-full">
          <div>
            <h1 className="text-[2.2rem] mb-[1rem] font-medium">Dashboard</h1>
            <div className="flex justify-around ">
              <AdminCard
                title={'Total Revenue'}
                total={totalRevenue}
                Icon={
                  <FiDollarSign size={25} className="text-muted-foreground" />
                }
                bgColor="#FF9666"
              />
              <AdminCard
                title={'Sales'}
                total={totalSales}
                Icon={<FaRegCreditCard size={25} />}
                bgColor="#66b0ff"
              />
              <AdminCard
                title={'Pizzas in Stock'}
                total={totalPizzas}
                Icon={<GiFullPizza size={25} />}
                bgColor="#95c787"
              />
            </div>
          </div>

          <div className="mt-[2rem]">
            <h1 className="text-3xl font-medium mt-[2rem] mb-[1rem] pl-[1rem]">
              Overview
            </h1>
            <Overview {...{ data: graphData }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
