import React from 'react'

export default function MessageOthers() {
    var props1 = {
        name: "Random User",
        message: "This is a sample message"
    }
  return (
    <div className='flex justify-start'>
        <div className='flex items-start justify-start'>
        <div className='py-6 ml-1'><p className='con-icon'>{props1.name[0]}</p></div>
         <div className='flex flex-col pl-2 bg-[#E4E6EB] w-full m-4 ml-2 rounded-3xl font-sans'>
        <div><p className='text-md font-semibold pl-2 pt-1'>{props1.name}</p></div>
        <div className='flex flex-col items-end w-contaier ml-2 pr-3 h-full '><p className='text-sm'>{props1.message}</p>
        <p className='text-sm scale-75'>12:24am</p>

        </div>
        </div>
      </div>
    </div>
  )
}
