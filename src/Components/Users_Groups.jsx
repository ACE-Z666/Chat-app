import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'
import logo1 from '../assets/logo1.png'

export default function Users_Groups() {
  return (
    <div className=' h-full w-[63vw] px-6 bg-[#E8E9EB] rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2'>
        <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-6 pb-4 shade-g pt-4'>
            <img src={logo1} alt="logo" className='h-[7vh]'/>
            <p className='text-xl font-bold text-stone-500 font-sans pl-2'>Online Users And Groups</p>
       </div>
       <div className='h-[7vh] w-[100%] flex items-center justify-start rounded-full bg-[#E0DFD5] px-5 mt-3 shade-g'> 
        <IconButton>
            <SearchIcon className='scale-125'/>
        </IconButton>
        <input placeholder='Search Users & Groups' className=' pl-2w-full h-6 bg-transparent border:none outline-none text-gray-800' /></div>
       <div className='flex flex-col mt-4 gap-y-4 overflow-auto rounded-2xl w-full bg-transparent  text-stone-500'>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109]  hover:text-black   hover:text-black transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#2</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109] hover:text-black  transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#3</p></div>
       </div>
       </div>
        <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109]  hover:text-black transition-all'>
        <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#4</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109] hover:text-black  transition-all'> 
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#5</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109] hover:text-black  transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#6</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109] hover:text-black  transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#1</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109] hover:text-black  transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#2</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109]  hover:text-black transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#3</p></div>
       </div>
       </div>
        <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109] hover:text-black  transition-all'>
        <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#4</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109]  hover:text-black transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#5</p></div>
       </div>
       </div>
       <div className='h-[7vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g pt-4 hover:bg-[#d18109] hover:text-black  transition-all'>
       <div className='con-icon'>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-semibold pl-2'>Test#6</p></div>
       </div>
       </div>
       </div>
      
    </div>
  )
}
