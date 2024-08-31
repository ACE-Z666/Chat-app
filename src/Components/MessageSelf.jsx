import React from 'react'

export default function MessageSelf() {
    var props2 = {
        name: "You",
        message: "This is a sample message"
      }
  return (
    <div className='flex justify-end'>
      <div className='flex flex-col items-end bg-[#7df1ca] w-container p-3 ml-2 rounded-3xl font-sans'>
        <p>{props2.message}</p>
        <p className='text-sm scale-75 mr-0 '>12:24am</p>
      </div>

    </div>
  )
}
