import { IconButton } from '@mui/material'
import React from 'react'

export default function CreateGroups() {
  return (
    <div className='flex flex-col h-full w-[63vw] bg-[#e8e9eb] rounded-tr-2xl rounded-br-2xl items-center justify-center'>   
    <div className='w-2/3 h-2/3 bg-[#e0dfd5] rounded-xl'>
    <div className='flex flex-col items-center justify-center gap-y-16 my-24'>
        <div><p className='text-2xl font-semibold'>Create Groups</p></div>
        <div><input type="text" placeholder='Enter Group Name' className='w-[30vw] bg-[#e8e9eb] rounded-full px-4 border-none outline-none h-10' /></div>
        <IconButton>
            <div><button className='w-[10vw] h-10 bg-[#e0dfd5] ronded-xl text-[#6e6e6e] font-semibold'>Create</button></div>
        </IconButton>
    </div>

    </div>
    </div>
  )
}
