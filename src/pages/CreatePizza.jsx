import React, { useEffect, useState } from 'react';
import CreateForm from '../components/admin/create';
import {
  getAllCheeses,
  getAllSauces,
  getAllVeggies,
  getSinglePizza,
} from '../actions/getData';
import { useAppContext } from '../context/appContext';
import Loader from '../components/loader';

const CreatePizza = () => {
  const [cheeses, setCheeses] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      const res1 = await getAllCheeses();
      const res2 = await getAllSauces();
      const res3 = await getAllVeggies();

      setCheeses([...res1]);
      setSauces([...res2]);
      setVeggies([...res3]);
      setLoading(false);
    };
    getAllData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div>
        <CreateForm cheeses={cheeses} sauces={sauces} veggies={veggies} />
      </div>
    </>
  );
};

export default CreatePizza;
