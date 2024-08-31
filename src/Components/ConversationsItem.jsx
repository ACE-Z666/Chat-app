import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ConversationsItem = ({ props }) => {
  return (
    <div className='flex flex-col items-baseline justify-start h-[10vh] w-full'>
      <div className='flex text-stone-500 justify-between'>
       <div className='con-icon'>{props.name[0]}</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-bold'>{props.name}</p></div>
       <div className='flex justify-between items-center w-[19vw] h-full '><p className='text-sm'>{props.lastMessage}</p>
       <p className='text-sm pr-3'>{props.timeStamp}</p>
       </div>
       </div>     
       
      </div>
    </div>
  )
}

export default ConversationsItem
