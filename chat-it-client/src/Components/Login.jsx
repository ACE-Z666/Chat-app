import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Backdrop } from '@mui/material'; 
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/authSlice";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";



export default function Login()  {

  const [data, setData] = useState ({name:"" , email: "", password:""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [logInStatus , setLogInStatus] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/app/welcome" />;
  }

  const changeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const loginHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        data,
        config
      );

      console.log("Login Response:", response.data);
      dispatch(login(response.data.data)); // Update Redux store
      localStorage.setItem("userData", JSON.stringify(response.data.data)); // Store token
      navigate("/app/welcome");
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const socket = io(import.meta.env.VITE_API_URL, {
    transports: ['websocket'],
    withCredentials: true
  });

  return (
    
    <div>
      <div className=' white-cont h-[90vh] px-10 py-7 w-[90vw] rounded-2xl shade-g flex'>
        <div className='h-full w-[27vw] bg-transparent rounded-tl-2xl rounded-l-2xl flex flex-col items-center justify-center px-4 py-5'>
          <img src="./public/logo1.png" alt="logo" />
        </div>
        <div className='h-full w-[60vw] px-6 bg-transparent rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2 items-center justify-center'>
          <div className='h-[75vh] w-full flex justify-center items-center bg-[#E0DFD5] shadow-lg rounded-xl px-9 pb-4'>
            <div className="flex flex-col gap-y-12 justify-center items-center bg-[#e8e9eb] shade-g px-12 py-12 rounded-xl">
              <p className='font-medium text-3xl text-stone-500'>Login Here!!</p> 
              <div className='flex flex-col gap-y-4 items-center justify-center'>
                <input onChange={changeHandler} name="name" type="text" placeholder='Enter Username' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12'/>
                <input onChange={changeHandler} name="password" type="password" placeholder='Enter Password' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12' />
              <p className="text-center mt-4 text-gray-600">
                 Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
                </p>
              </div>
              <button onClick={loginHandler} className='w-[10vw] h-10 bg-[#f1ce00] rounded-xl text-[#6e6e6e] font-semibold hover:text-[#e0dfd5] hover:bg-[#6e6e6e] transition-all'>Login</button>
              {error && <p className="text-red-500">{error}</p>}
              {loading && <div className="spinner">Loading...</div>}

            </div>
          </div>
        </div>
      </div>
    </div> 
  )};
