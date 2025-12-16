import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isLoading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  };
  useEffect(() => {
    if (message) {
      // toast.success(message)
      // dispatch(resetAuthSlice())
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, isLoading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* left side */}
        <div className=" w-full md:w-1/2 items-center justify-center flex bg-white p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto " />
              </div>
            </div>
            <h1 className="text-3xl w-full font-medium   m-12 overflow-hidden ">
              Welcome Back !!
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter your credentials to log In .
            </p>
            <form onSubmit={handleLogin} className="">
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border-black border px-4 py-3 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border-black border px-4 py-3 rounded-md focus:outline-none mb-3"
                />
              </div>
              <Link
                to={"/password/forgot"}
                className="font-semibold text-black"
              >
                {" "}
                Forgot Password !
              </Link>

        

              <button
                type="submit"
                className="border-2 mt-4 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                SIGN IN
              </button>
                    <div className=" block text-center md:hidden font-semibold mt-8 cursor-pointer">
                <p>
                  New to your platform?{" "}
                  <Link
                    to={"/register"}
                    className="text-sm  text-gray-500 hover:underline"
                  ></Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* right side */}
        <div className="hidden w-full md:w-1/2 md:flex bg-black text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]   ">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12 ">
              New to our platform? Sign up now.
            </p>
            <Link
              to={"/register"}
              className="border-2 mt-5 px-8  border-white w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
