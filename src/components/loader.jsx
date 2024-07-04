import React from 'react';

import { FadeLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="w-[100%] h-[100%] backdrop-blur-sm fixed top-0 right-0 left-0 bottom-0 z-[999999] flex items-center justify-center">
      <FadeLoader color="#f26e10" />
    </div>
  );
};

export default Loader;
