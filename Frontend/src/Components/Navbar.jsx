import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const Navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedIn, setUserData } =
    useContext(AppContext);
  return (
    <div className="w-full flex justify-between items-center p-4 absolute top-0">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />

      <button
        onClick={() => Navigate("/login")}
        className="flex items-center gap-2 px-6 py-2 rounded-full border cursor-pointer"
      >
        Login <img src={assets.arrow_icon} alt="" />
      </button>
    </div>
  );
};

export default Navbar;
