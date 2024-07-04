import React from 'react';

const AdminCard = ({ title, total, Icon, bgColor }) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`w-[320px] h-[190px] rounded-md  border-[1px]
        border-gray-200 flex justify-evenly `}
    >
      <div className="w-full p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-[21px] font-medium ">{title}</h1>
          {Icon}
        </div>

        <h1 className="text-3xl font-bold">{total}</h1>
      </div>
    </div>
  );
};

export default AdminCard;
