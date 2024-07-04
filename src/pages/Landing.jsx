import React from 'react';
import { Link } from 'react-router-dom';

import BannerImage from '../assets/images/banner.jpg';

const Landing = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-[80%] flex gap-x-7 justify-between">
        <div className="w-[400px] flex flex-col  gap-y-[1rem] ">
          <h1 className="text-[#FF6900] text-[40px] font-bold ">
            {' '}
            Shaggy Pizza
          </h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            doloremque et eaque aspernatur nam distinctio, deleniti quas tempore
            cum illum corrupti sequi id voluptatibus facere quis tenetur,
            accusamus asperiores alias? Mollitia, consequatur officia aut enim
            et ad at natus ut, unde fugit sunt optio inventore quos voluptas
            laborum eum assumenda quo? Distinctio provident voluptatem eum
            corporis ipsam dolore amet fuga.
          </span>
          <Link
            to={'/login'}
            className="text-[20px] font-medium px-[13px] py-[8px] rounded-md
            w-[50%] bg-[#FF6900] flex items-center text-center text-white"
          >
            {' '}
            Continue
          </Link>
        </div>
        <div className="w-[500px] h-[400px] rounded-md">
          <img
            src={BannerImage}
            alt="banner image"
            className="w-[100%] h-[100%] rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
