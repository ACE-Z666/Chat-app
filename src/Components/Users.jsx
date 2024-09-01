import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'
import logo1 from '../assets/logo1.png'
import { useSelector } from 'react-redux';

export default function Users() {
  const lightTheme = useSelector((state) => state.theme.light);
  return (
    <div className={' h-full w-[63vw] px-6 bg-[#E8E9EB] rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2' + (lightTheme ? " bg-[#E8E9EB]" : " dark-cont")}>
        <div className={'h-[7vh] w-full flex justify-start items-center text-stone-500 bg-[#E0DFD5] rounded-xl px-6 pb-4 shade-g pt-4' + (lightTheme ? "" : " dark-theme1")}>
            <img src={logo1} alt="logo" className='h-[7vh]'/>
            <p className='text-xl font-bold font-sans pl-2'>Availiable Users</p>
       </div>
       <div className={'h-[7vh] w-[100%] flex items-center justify-start rounded-full bg-[#E0DFD5] px-5 mt-3 shade-g text-gray-800' + (lightTheme ? "" : " dark-theme1")} > 
        <IconButton>
            <SearchIcon className={'scale-125' + (lightTheme ? "" : " text-white")}/>
        </IconButton>
        <input placeholder='Search Users & Groups' className=' pl-2 w-full h-8 bg-transparent border:none outline-none' /></div>
       <div className='flex flex-col mt-4 gap-y-4 overflow-auto rounded-2xl w-full bg-transparent   text-stone-500'>
       <div className={'h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 transition-all hover:text-black' + (lightTheme ? " hover:bg-[#f1ce01] text-gray-500 " : " text-white hover:bg-[rgb(240,240,240)] bg-[#2d3941]")}>
       <div className={'' + (lightTheme ? "con-icon" : " con-icon-d")}>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#2</p></div>
       </div>
       </div>
       <div className={'h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 transition-all hover:text-black' + (lightTheme ? " hover:bg-[#f1ce01] text-gray-500 " : " text-white hover:bg-[rgb(240,240,240)] bg-[#2d3941]")}>
       <div className={'' + (lightTheme ? "con-icon" : " con-icon-d")}>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#3</p></div>
       </div>
       </div>
       </div>
      
    </div>
  )
}