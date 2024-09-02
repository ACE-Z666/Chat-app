import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  { Backdrop } from '@mui/material';
export default function Login() {

  const [data, setData] = useState ({name:"" , email: "", password:""});
  const [loading, setLoading] = useState(false);

  const [signInStatus , setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const signUpHandler = async () => {
    setLoading(true);
    try{
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const response = await axios.post(
        "http://localhost:8080/user/login",
      data,
      config
    );
    setSignInStatus({ msg: "Success", key: Math.random()});
    navigate("/app/welcome");
    localStorage.setItem("userData", JSON.stringify(response));
    setLoading (false);   
  }
  catch (error) {
    if(error.response.status === 405){
      setSignInStatus({ msg: "username with same Email already Exists", key: Math.random()});
  }setLoading(false);
  }
}

  return (

   <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
    <div>
      <div  className='white-cont h-[90vh] px-10 py-7 w-[90vw] rounded-2xl shade-g flex'>
        <div className='h-full w-[27vw] bg-transperant rounded-tl-2xl rounded-l-2xl flex flex-col items-center justify-center px-4 py-5'>
            <img src="./logo1.png" alt="logo" />
        </div>
    <div className=' h-full w-[60vw] px-6 bg-transperant rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2 items-center justify-center'>
        <div className='h-[75vh] w-full flex justify-center items-center bg-[#E0DFD5] shadow-lg rounded-xl px-9 pb-4'>
            <div className="flex flex-col gap-y-16 justify-center items-center bg-[#e8e9eb] shade-g px-12 py-12 rounded-xl">
               <p className='font-medium text-3xl text-stone-500'>Sign Up!!</p> 
               <div className='flex flex-col gap-y-4 items-center justify-center'>
               <input  onChange={changeHandler} type="text" placeholder='Enter Username' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12'/>
               <input onChange={changeHandler} type="text" placeholder='Enter E-mail Id' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12'/>
               <input onChange={changeHandler} type="password" placeholder='Enter Password' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12' />
               </div>
            <div><button onClick={signUpHandler} className='w-[10vw] h-10 bg-[#f1ce00] rounded-xl text-[#6e6e6e] font-semibold hover:text-[#e0dfd5] hover:bg-[#6e6e6e] transition-all'>Sign Up</button></div>
            </div>
           
        </div>
        </div>

        </div>

    </div>
    </Backdrop>
  )
}