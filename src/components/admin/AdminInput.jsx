import React from 'react';

const AdminInput = ({ type, id, name, value, onChange, placeholder }) => {
  return (
    <div className="w-full flex flex-col">
      <label
        className="text-black text-[17px] font-semibold mb-[10px]"
        htmlFor={id}
      >
        {id}
      </label>
      <input
        className="border-gray-400 border-[1px] w-[400px] px-[12px] py-[8px]
        focus:border-gray-300 bg-white"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AdminInput;
