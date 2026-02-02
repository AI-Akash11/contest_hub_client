import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10 md:p-15">
      <div className="max-w-[300px] md:max-w-[600px] mb-6 md:mb-10">
        <img src="https://i.ibb.co.com/Kx9pt7p6/App-Error.png" alt="" />
      </div>
      <p className="font-semibold 5xl mb-2">OPPS!! NO Contest FOUND</p>
    </div>
  );
};

export default NotFound;
