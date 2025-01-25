import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import EmailVerify from "./Pages/EmailVerify.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/email-verify" element={<EmailVerify />} />
    </Routes>
  );
};

export default App;
