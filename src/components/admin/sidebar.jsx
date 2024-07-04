import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
import { MdFoodBank } from 'react-icons/md';
import { GoPeople } from 'react-icons/go';
import { FaCanadianMapleLeaf } from 'react-icons/fa';
import { BiCheese, BiSad } from 'react-icons/bi';
import { GiSaucepan } from 'react-icons/gi';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { GiOpenedFoodCan } from 'react-icons/gi';

const links = [
  {
    id: 1,
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: <MdOutlineDashboard />,
  },
  {
    id: 2,
    name: 'Create',
    href: '/admin/create',
    icon: <FaRegPenToSquare />,
  },
  {
    id: 3,
    name: 'Pizzas',
    href: '/admin/all-pizzas',
    icon: <GiOpenedFoodCan />,
  },

  {
    id: 4,
    name: 'Orders',
    href: '/admin/orders',
    icon: <MdFoodBank />,
  },
  {
    id: 5,
    name: 'Customers',
    href: '/admin/customers',
    icon: <GoPeople />,
  },
  {
    id: 6,
    name: 'Sauces',
    href: '/admin/sauces',
    icon: <GiSaucepan />,
  },
  {
    id: 7,
    name: 'Veggies',
    href: '/admin/veggies',
    icon: <FaCanadianMapleLeaf />,
  },
  {
    id: 8,
    name: 'Cheeses',
    href: '/admin/cheeses',
    icon: <BiCheese />,
  },
];
const Sidebar = () => {
  return (
    <div className="w-[300px] h-screen left-0 top-0 bottom-0 shadow-sm py-[1rem] px-[1rem] fixed">
      <div>
        <h1 className="text-[25px] text-[#FF6900] font-bold">Shaggy Pizza</h1>
        <div className="flex flex-col mt-[2rem] gap-y-[5px] ">
          {links.map((link) => {
            const { href, id, icon, name } = link;
            return (
              <div key={id} className="mt-[1rem] rounded-lg">
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? 'bg-[#FFD2B3] w-[90%] px-[12px] flex py-[13px] text-gray-900 text-[16px] items-center gap-x-4 rounded-lg '
                        : 'bg-white w-[90%] px-[12px] flex hover:bg-gray-100 py-[13px] text-gray-900 text-[16px] items-center gap-x-4 rounded-lg'
                    }`
                  }
                  key={id}
                  to={href}
                >
                  <p>{icon}</p>
                  {name}
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
