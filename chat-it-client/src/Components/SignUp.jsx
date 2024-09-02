import React from 'react'
export default function Login() {
  return (
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
               <input type="text" placeholder='Enter Username' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12'/>
               <input type="text" placeholder='Enter E-mail Id' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12'/>
               <input type="password" placeholder='Enter Password' className='w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12' />
               </div>
            <div><button className='w-[10vw] h-10 bg-[#f1ce00] rounded-xl text-[#6e6e6e] font-semibold hover:text-[#e0dfd5] hover:bg-[#6e6e6e] transition-all'>Sign Up</button></div>
            </div>
           
        </div>
        </div>

        </div>

    </div>
  )
}