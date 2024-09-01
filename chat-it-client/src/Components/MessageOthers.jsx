import React from 'react'
import { useSelector } from 'react-redux';

export default function MessageOthers() {
    var props1 = {
        name: "Random User",
        message: "This is a sample message"
    }
    const lightTheme = useSelector((state) => state.theme.light);
  return (
    <div className='flex justify-start'>
        <div className='flex items-start justify-start'>
        <div className="py-6 ml-1"> <p className={'' + (lightTheme ? "con-icon" : " con-icon-d")}>{props1.name[0]}</p></div>
         <div className={'flex flex-col pl-2  w-full m-4 ml-2 rounded-3xl font-sans' + (lightTheme ? " bg-[#E4E6EB] text-black" : " bg-[#323232] text-white")}>
        <div><p className='text-md font-semibold pl-2 pt-1'>{props1.name}</p></div>
        <div className='flex flex-col items-end w-contaier ml-2 pr-3 h-full '><p className='text-sm'>{props1.message}</p>
        <p className='text-sm scale-75'>12:24am</p>

        </div>
        </div>
      </div>
    </div>
  )
}
