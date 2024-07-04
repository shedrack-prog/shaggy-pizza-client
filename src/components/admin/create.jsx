import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import AdminInput from './AdminInput';
import SelectOptions from './select-options';
import Loader from '../loader';

import { createNewPizza } from '../../actions/pizzas';
import dataURItoBlob from '../../functions/dataUriToBlob';
import { uploadImages } from '../../functions/uploadImages';

import { CiImageOn } from 'react-icons/ci';
import { CiEdit } from 'react-icons/ci';

const CreateForm = ({ sauces, cheeses, veggies }) => {
  const imageRef = useRef(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // database states
  const [pizzaSauce, setPizzaSauce] = useState([]);
  const [pizzaCheese, setPizzaCheese] = useState([]);
  const [pizzaVeggie, setPizzaVeggie] = useState([]);

  const handleClick = (name, id) => {
    if (name === 'sauces') {
      setPizzaSauce((s) =>
        s.includes(id) ? s.filter((item) => item !== id) : [...s, id]
      );
      return;
    } else if (name === 'cheeses') {
      setPizzaCheese((s) =>
        s.includes(id) ? s.filter((item) => item !== id) : [...s, id]
      );
      return;
    } else {
      setPizzaVeggie((s) =>
        s.includes(id) ? s.filter((item) => item !== id) : [...s, id]
      );
    }
  };

  // This function will check and validate image type and  parse it
  const handleImages = async (e) => {
    const file = e.target.files[0];

    if (
      file.type !== 'image/Jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp'
    ) {
      toast.error('Invalid file type');
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      toast.error('Invalid file size. max 30MB allowed');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  // This function will create a new pizza
  const handleSubmit = async () => {
    if (!image) {
      toast.error('Please upload an image');
      setLoading(false);
      return;
    }
    if (!name || !image || !description || !price) {
      toast.error('Please provide all values.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let blobImage = dataURItoBlob(image);
      let path = 'Pizzas';
      let formData = new FormData();
      formData.append('file', blobImage);
      formData.append('path', path);
      const response = await uploadImages(formData, path);
      const res = await createNewPizza({
        name,
        description,
        image: response[0].url,
        price,
        newSauces: pizzaSauce,
        newCheeses: pizzaCheese,
        newVeggies: pizzaVeggie,
      });
      toast.success(res?.data?.message);
      console.log(res);
      setName('');
      setDescription('');
      setPrice('');
      setPizzaCheese([]);
      setPizzaSauce([]);
      setPizzaVeggie([]);
      setImage('');
    } catch (error) {
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mt-[1.7rem] flex items-center justify-center px-2">
        <div className="flex flex-col ">
          <h1 className="text-[30px] text-left font-semibold mb-[20px]">
            Create Pizza
          </h1>
          <form action="" className="flex items-center justify-center ">
            <div className="ml-0 grid grid-cols-2 gap-[1rem] place-items-center  mx-auto">
              <AdminInput
                id="name"
                name={name}
                type="text"
                placeholder={'e.g Dominican pizza'}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <AdminInput
                id="description"
                name={description}
                type="text"
                placeholder={'Enter a description here'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <AdminInput
                id="Price"
                name={price}
                type="number"
                placeholder={'e.g $30'}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </form>
          <div className="mt-[1rem]">
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
          </div>
          {!image && (
            <div
              className="border-[1px] border-gray-300 w-[350px] mt-[1rem]
          flex flex-col items-center justify-center h-[300px] bg-gray-100 rounded-md mb-[1rem]"
            >
              <div
                className="cursor-pointer relative"
                onClick={() => imageRef.current.click()}
              >
                <CiImageOn size={100} color="gray" />
                <span className="">Add an Image</span>
              </div>
            </div>
          )}

          {image && (
            <div
              className="bg-white relative  border-[1px] border-gray-200 mt-[2rem]
          rounded-md w-[300px] flex items-center justify-center h-[300px] "
            >
              <span
                onClick={() => imageRef.current.click()}
                className="absolute top-[20px] right-[20px] flex gap-2 items-center
            px-[13px] py-[5px] rounded-md bg-gray-100 cursor-pointer"
              >
                <CiEdit size={20} />
                <span className="text-14px text-gray-900">Edit</span>
              </span>
              <img
                src={image}
                className="object-cover w-[70%] h-[70%] relative rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            ref={imageRef}
            hidden
            onChange={handleImages}
            accept="image/jpeg, image/png,image/jpg,image/webp"
          />
          <button
            onClick={() => handleSubmit()}
            type="submit"
            className="px-[12px] py-[8px] mb-[1rem] bg-[#FF6900] w-[40%] mt-[1rem] rounded-md text-white"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
