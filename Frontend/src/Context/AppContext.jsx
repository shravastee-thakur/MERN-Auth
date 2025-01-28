import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  // const getAuthState = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       backendUrl + "/api/v1/users/is-authenticated"
  //     );
  //     if (data.success) {
  //       setIsLoggedIn(true);
  //       getUserData();
  //     }
  //     data.success ? setIsLoggedIn(true) : setIsLoggedIn(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/v1/userData/get-user-data"
      );
      data.success ? setUserData(data.userData) : setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getAuthState();
  // }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    // getUserData,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
