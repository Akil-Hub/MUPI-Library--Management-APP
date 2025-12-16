import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { isLoading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // if (message) {
    //   toast.success(message);
    // }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, isLoading]);

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));

  };
      if (isAuthenticated) {
      return <Navigate to={"/"} />;
    }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* left side */}
        <div className=" w-full md:w-1/2 items-center justify-center flex bg-white p-8 relative">
          <Link
            to={"/register"}
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end "
          >
            Back
          </Link>

          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto " />
              </div>
            </div>
            <h1 className="text-3xl w-full font-medium   m-12 overflow-hidden ">
              Check you Mailbox.
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter the otp to proceed.
            </p>
            <form onSubmit={handleOtpVerification} className="">
              <div className="mb-4">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full border-black border px-4 py-3 rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                VERIFY
              </button>
            </form>
          </div>
        </div>
        {/* right side */}
        <div className="hidden w-full md:w-1/2 md:flex bg-black text-white flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]   ">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img src={logo_with_title} alt="logo"  className="mb-12 h-44 w-auto"/>
            </div>
            <p className="text-gray-300 mb-12 ">New to our platform? Sign up now.</p>
            <Link to={'/register'} className="border-2 mt-5 px-8  border-white w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">SIGN UP</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
