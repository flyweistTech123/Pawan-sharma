/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiFillPhone } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { Baseurl, showMsg } from "../../../../Baseurl";

const VendorRegister = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setpassword] = useState("");
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${Baseurl}api//register`, {
        userName: userName,
        email: email,
        mobileNumber: mobileNumber,
        password: password,
      });
      localStorage.setItem("token", data?.token);
      showMsg("Success", "Admin Create", "success");
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "SomeThing is wrong"
      );
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#242424]">
        <form
          className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-[#444444] p-5 md:py-10 "
          onSubmit={submitHandler}
        >
          <p className="text-3xl text-[#fff]"> Admin Panel </p>
          <section className="py-7 space-y-6">
            {/* name */}
            <div
              className="shadow-2xl sm:w-96  space-x-4 flex items-center w-64  p-2 rounded-md"
              style={{
                color: "#fff",
                borderColor: "#242424",
                background: "#242424",
              }}
            >
              <input
                type="text"
                placeholder="User name"
                required
                onChange={(e) => setUserName(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiFillPhone className="text-xl " />
            </div>
            {/* email */}
            <div
              className="shadow-2xl sm:w-96  space-x-4 flex items-center w-64  p-2 rounded-md"
              style={{
                color: "#fff",
                borderColor: "#242424",
                background: "#242424",
              }}
            >
              <input
                type="email"
                placeholder="User Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiFillPhone className="text-xl " />
            </div>
            {/* mobile number */}
            <div
              className="shadow-2xl sm:w-96  space-x-4 flex items-center w-64  p-2 rounded-md"
              style={{
                color: "#fff",
                borderColor: "#242424",
                background: "#242424",
              }}
            >
              <input
                type="number"
                placeholder="Mobile number"
                required
                onChange={(e) => setMobileNumber(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiFillPhone className="text-xl " />
            </div>
            {/* Password */}
            <div
              className="shadow-2xl sm:w-96  space-x-4 flex items-center w-64  p-2 rounded-md"
              style={{
                color: "#fff",
                borderColor: "#242424",
                background: "#242424",
              }}
            >
              <input
                type={inputpass ? "text" : "password"}
                placeholder="password"
                name="password"
                required
                onChange={(e) => setpassword(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            <button
              type="submit"
              className="py-2 cursor-pointer tracking-wider bg-[#242424] text-[#fff] flex justify-center items-center w-full rounded-md font-medium   "
            >
              {loading ? (
                <Oval height={30} secondaryColor="#fff" color="#fff" />
              ) : (
                <div className="flex items-center">
                  <span className="flex items-center justify-center">
                    Create Admin
                  </span>
                  <BiLogInCircle className="pl-1.5 text-2xl" />
                </div>
              )}
            </button>
          </section>
        </form>
      </div>
    </>
  );
};

export default VendorRegister;
