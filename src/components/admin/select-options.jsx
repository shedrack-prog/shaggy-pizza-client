import React from 'react';

const SelectOptions = ({ name, data, type, handleClick }) => {
  // let alreadyIncluded = true;
  // console.log('type here', type);
  return (
    <div>
      <div>
        <p className="text-gray-900 text-[20px] pt-[1rem] font-medium">
          Select {name} for the pizza
        </p>
        <p className="mb-[10px] text-gray-600 read-only">
          ({type.length}) selected
        </p>
        <div className="flex flex-wrap gap-3">
          {data?.map((item) => {
            let alreadyIncluded = type.includes(item._id);

            // console.log(alreadyIncluded);
            return (
              <span
                key={item._id}
                onClick={() => handleClick(name, item._id)}
                className={`${
                  alreadyIncluded
                    ? 'bg-blue-300 text-gray-900 px-[8px] py-[6px] cursor-pointer rounded-md text-[14px] h-[100%] '
                    : 'px-[8px] py-[6px] text-center cursor-pointer rounded-md text-[14px] bg-gray-200 h-[100%]'
                } `}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectOptions;
