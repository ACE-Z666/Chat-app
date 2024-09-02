import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import  { IconButton } from '@mui/material';
import ConversationsItem from './ConversationsItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import { useDispatch } from 'react-redux';


const Sidebar = () => {

    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.theme.light);
    
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
        const navigate = useNavigate();

  return (
    <div className='h-full w-[27vw]  rounded-tl-2xl rounded-l-2xl flex flex-col items-center px-4 py-5' >
       <div id='side-icons' className={"h-[8vh] w-[96%] flex items-center justify-between rounded-xl bg-[#E0DFD5] px-5 shade-g" + (lightTheme ? "" : " dark-theme")}>
            <IconButton> 
                <AccountCircleIcon className={'scale-125' + (lightTheme ? "" : " dark-theme1")}/> 
            </IconButton>
            <div  id='side-icons2' className='flex items-center justify-around gap-x-5'>
                <IconButton onClick={() => navigate('/app/users')}>
                    <PersonAddIcon className={'scale-125'+(lightTheme ? "" : " dark-theme1")}/>
                </IconButton>
                <IconButton onClick={() => navigate('/app/groups')}>
                    <GroupAddIcon className={'scale-125'+(lightTheme ? "" : " dark-theme1")}/>
                </IconButton>
                <IconButton onClick={() => navigate('/app/create_groups')}>
                    <AddCircleIcon className={'scale-125' + (lightTheme ? "" : " dark-theme1")}/>
                </IconButton>
                <IconButton onClick={() => { 
                 console.log('Button clicked'); 
                    dispatch(toggleTheme()); 
                        }}>
                     { lightTheme ? <NightlightIcon className='scale-125'/> : <LightModeIcon className='scale-125 text-white'/> }
                </IconButton>

            </div>
       </div>
       <div id='side-user' className={'h-[8vh] w-[96%] flex items-center justify-start rounded-full bg-[#E0DFD5] px-5 my-4 shade-g' + (lightTheme ? "" : " dark-theme1")}> 
        <IconButton>
            <SearchIcon className={'scale-125' + (lightTheme ? "" : " dark-theme1")}/>
        </IconButton>
        <input placeholder='Search' className={' pl-2 w-full h-6 bg-transparent border:none outline-none' + (lightTheme ? " text-gray-800" : " text-white")} /></div>
       <div id='side-user' className={'h-[76vh] w-[96%] flex flex-col items-start rounded-2xl text-white bg-[#E0DFD5] px-4 pt-6 shade-g' + (lightTheme ? "" : " dark-theme")}>
        {conversations.map((conversation) => {
            return <ConversationsItem props={conversation} key={conversation.name} />
        })}
       </div>
          
    </div>
  )
}

export default Sidebar
