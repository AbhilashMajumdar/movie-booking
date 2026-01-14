import React from "react";

const Header = ({heading}) => {
  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <h1 className="text-2xl font-bold">{heading}</h1>
      </div>
    </div>
  );
};

export default Header;
