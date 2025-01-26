import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../Context/AppContext";

const Login = () => {
  const Navigate = useNavigate();

  const { backendUrl } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100">
      <div className="bg-amber-950 p-8 rounded-2xl">
        <h1 className="text-xl font-bold text-amber-100 text-center">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login to Your Account"}
        </h1>
        <h2 className="text-amber-100 text-center">
          {state === "Sign Up" ? "Sign Up" : "Login"}
        </h2>
        <form>
          {state === "Sign Up" && (
            <div className="text-white flex items-center gap-2 mb-4 w-full px-5 py-3 rounded-full bg-amber-600">
              <label>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                className="bg-transparent outline-none"
              />
            </div>
          )}

          <div className="text-white flex items-center gap-2 mb-4 w-full px-5 py-3 rounded-full bg-amber-600">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              className="bg-transparent outline-none"
            />
          </div>
          <div className="text-white flex items-center gap-2 mb-4 w-full px-5 py-3 rounded-full bg-amber-600">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
            />
          </div>
          <p
            onClick={() => Navigate("/reset-password")}
            className="text-white cursor-pointer"
          >
            Forget Password
          </p>
          <button
            type="submit"
            className="text-white w-full rounded-full bg-amber-600 py-2.5"
          >
            {state}
          </button>
          <p className="text-white">
            {state === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <span
              className="text-amber-600 cursor-pointer"
              onClick={() =>
                setState(state === "Sign Up" ? "Login" : "Sign Up")
              }
            >
              {state === "Sign Up" ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
