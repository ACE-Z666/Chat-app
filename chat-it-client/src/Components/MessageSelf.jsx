import React from 'react'
import { useSelector } from 'react-redux';


export default function MessageSelf() {
   const lightTheme = useSelector((state) => state.theme.light);
    var props2 = {
        name: "You",
        message: "This is a sample message"
      }
  return (
    <div className='flex justify-end'>
      <div className={'flex flex-col items-end w-container p-3 ml-2 rounded-3xl font-sans'+ (lightTheme ? " bg-[#f1ce00] text-black" : " bg-[#d18109] text-white")}>
        <p>{props2.message}</p>
        <p className='text-sm scale-75 mr-0 '>12:24am</p>
      </div>

    </div>
  )
}
