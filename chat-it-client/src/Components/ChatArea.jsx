import { IconButton } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send'
import MessageSelf from './MessageSelf';
import MessageOthers from './MessageOthers';
import { useSelector } from 'react-redux';




const ChatArea = () => {
  const lightTheme = useSelector((state) => state.theme.light);
  return (
    <div className=' h-full w-[63vw] px-6 rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2'>
        <div className={'h-[8vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-9 pb-4 shade-g' + (lightTheme ? "" : " dark-theme")}>
        <div className={'flex text-stone-500 items-center pt-3 justify-between' + (lightTheme ? "" : " text-white")} >
       <div className={'' + (lightTheme ? "con-icon" : " con-icon-d")}>T</div>
       <div className='flex flex-col pl-2'>
       <div><p className='text-lg font-bold'>Test#1</p></div>
       <div className='flex justify-start items-center w-[52vw] h-full '><p className='text-sm pr-3'>Today</p>
       </div>
       </div>
       <div className='mr-0'>
        <IconButton>
          <DeleteIcon className={'scale-125' + (lightTheme ? "" : " text-white")}/>
        </IconButton>
        </div>     
       
      </div>

        </div>
        <div className={'h-[76vh] w-full flex flex-col justify-start bg-[#E0DFD5] rounded-xl px-8 my-2 overflow-y-scroll gap-y-2 shade-g' + (lightTheme ? "" : " dark-theme")}>

          <MessageOthers/>
          <MessageSelf/>
          <MessageOthers/>
          <MessageSelf/>
          <MessageOthers/>
          <MessageSelf/>
          <MessageOthers/>
          <MessageSelf/>
          <MessageOthers/>

            

        </div>
        <div className={'h-[8vh] w-full flex justify-start items-center bg-[#E0DFD5] rounded-xl px-8 pb-0 mt-1 shade-g' + (lightTheme ? "" : " dark-theme")}>
       
        <input placeholder='Type a message' className={'pl-1 w-full h-6 bg-transparent border:none outline-none ' + (lightTheme ? " text-gray-800" : " text-white")} />
        <IconButton>
            <SendIcon className={'scale-125' + (lightTheme ? "" : " text-white")}/>
        </IconButton>
        </div>
       
      
    </div>
  )
}

export default ChatArea
