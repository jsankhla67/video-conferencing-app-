import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full ">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#ba2323"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
