import { IconButton } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

export default function CreateGroups() {
  const lightTheme = useSelector((state) => state.theme.light);
  return (
    <div className='flex flex-col h-full w-[63vw] rounded-tr-2xl rounded-br-2xl items-center justify-center '>   
    <div className={'w-2/3 h-2/3 bg-[#e0dfd5] rounded-xl shade-g' + (lightTheme ? "" : " dark-theme")}>
    <div className='flex flex-col items-center justify-center gap-y-16 my-36'>
        <div><p className={'text-2xl font-semibold' + (lightTheme ? " text-gray-800" : " text-white")}>Create Groups</p></div>
        <div><input type="text" placeholder='Enter Group Name' className='w-[20vw] bg-[#e8e9eb] rounded-full px-4 border-none outline-none h-10 text-black' /></div>
        <div><button className='w-[10vw] h-10 bg-[#d18109] rounded-xl text-[#faf9f9] font-semibold hover:text-[#000000] hover:bg-[#ffffff] transition-all'>Create</button></div>
        </div>
    </div>
    </div>
  )
}
