import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import  { IconButton } from '@mui/material';
import ConversationsItem from './ConversationsItem';
import { useState } from 'react';

const Sidebar = () => {
    const [conversations, setConversations] = useState([
        {
            name: "Test#1",
            lastMessage: "Hello",
            timeStamp: "10:00"
        },
        {
            name: "Test#2",
            lastMessage: "Hello",
            timeStamp: "10:00"
        },
        {
            name: "Test#3",
            lastMessage: "Hello",
            timeStamp: "10:00"
        }]);

  return (
    <div className='h-full w-[27vw] bg-[#E8E9EB] rounded-tl-2xl rounded-l-2xl flex flex-col items-center px-4 py-5'>
       <div className='h-[8vh] w-[96%] flex items-center justify-between rounded-xl text-white bg-[#E0DFD5] px-5 '>
            <IconButton> 
                <AccountCircleIcon className='scale-125'/> 
            </IconButton>
            <div className='flex items-center justify-around gap-x-5'>
                <IconButton>
                    <PersonAddIcon className='scale-125'/>
                </IconButton>
                <IconButton>
                    <GroupAddIcon className='scale-125'/>
                </IconButton>
                <IconButton>
                    <AddCircleIcon className='scale-125'/>
                </IconButton>
                <IconButton>
                    <NightlightIcon className='scale-125'/>
                </IconButton>
            </div>
       </div>
       <div className='h-[8vh] w-[96%] flex items-center justify-start rounded-full bg-[#E0DFD5] px-5 my-4'> 
        <IconButton>
            <SearchIcon className='scale-125'/>
        </IconButton>
        <input placeholder='Search' className=' pl-2w-full h-6 bg-transparent border:none outline-none text-gray-800' /></div>
       <div className='h-[76vh] w-[96%] flex flex-col items-start rounded-2xl text-white bg-[#E0DFD5] px-6 py-6'>
        {conversations.map((conversation) => {
            return <ConversationsItem props={conversation} key={conversation.name}/>
        })}
       </div>
          
    </div>
  )
}

export default Sidebar
