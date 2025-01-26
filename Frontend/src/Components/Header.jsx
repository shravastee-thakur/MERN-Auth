import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1>Welcome</h1>
      <button className="flex items-center gap-2 px-6 py-2 rounded-full border">
        Get Started
      </button>
    </div>
  );
};

export default Header;
