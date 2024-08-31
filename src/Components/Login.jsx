import React from 'react'
import  { IconButton } from '@mui/material';


export default function Login() {
  return (
    <div>
      <div  className='bg-[#e8e9eb] h-[90vh] w-[90vw] rounded-2xl shadow-mc flex'>
        <div className='h-full w-[27vw] bg-[#e8e9eb] rounded-tl-2xl rounded-l-2xl flex flex-col items-center justify-center px-4 py-5'>
            <img src="./logo1.png" alt="logo" />
        </div>
    <div className=' h-full w-[63vw] px-6 bg-[#E8E9EB] rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2 items-center justify-center'>
        <div className='h-[75vh] w-full flex justify-center items-center bg-[#E0DFD5] rounded-xl px-9 pb-4'>
            <div className="flex flex-col gap-y-16 justify-center items-center">
               <p className='font-medium text-3xl'>Login Here!!</p> 
               <input type="text" placeholder='Enter Username' className='w-[30vw] bg-[#e8e9eb] rounded-full px-4 border-none outline-none h-10'/>
               <input type="password" placeholder='Enter Password' className='w-[30vw] bg-[#e8e9eb] rounded-full px-4 border-none outline-none h-10' />
            <div><button className='w-[10vw] h-10 bg-[#e0dfd5] ronded-xl text-[#6e6e6e] font-semibold'>Login</button></div>
            </div>
           
        </div>
        </div>

        </div>

    </div>
  )
}
