import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import  { IconButton } from '@mui/material';
import ConversationsItem from './ConversationsItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toggleTheme } from '../Features/themeSlice';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import axios from 'axios';

const Sidebar = ({ setSelectedChat, selectedChat }) => {
    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.theme.light);
    
    const [conversations, setConversations] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [activeGroups, setActiveGroups] = useState([]);
    const user = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();

    const socket = io(import.meta.env.VITE_API_URL, {
      transports: ['websocket'],
      withCredentials: true
    });

    useEffect(() => {
      if (!user || !user.token) {
        alert("You are not logged in. Redirecting to login...");
        window.location.href = "/";
        return;
      }

      const fetchChats = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };

          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/chat`, config);
          setConversations(data);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      };

      fetchChats();
    }, []);

    useEffect(() => {
      if (!user || !user.token) return;

      const fetchActiveUsers = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${user.token}` },
          };
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/chat/active-users`,
            config
          );
          setActiveUsers(data);
        } catch (error) {
          console.error("Error fetching active users:", error);
        }
      };

      const fetchActiveGroups = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${user.token}` },
          };
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/chat/active-groups`,
            config
          );
          setActiveGroups(data);
        } catch (error) {
          console.error("Error fetching active groups:", error);
        }
      };

      fetchActiveUsers();
      fetchActiveGroups();
    }, [user, selectedChat]);

        // Handle user click: fetch or create chat, then set as selected and navigate
        const handleUserClick = async (userObj) => {
          try {
            const config = {
              headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await axios.post(
              `${import.meta.env.VITE_API_URL}/chat`,
              { userId: userObj._id },
              config
            );
            setSelectedChat(data);
            navigate("/app/chat"); // <-- Add this
          } catch (error) {
            console.error("Error opening chat:", error);
          }
        };

        // Handle group click: fetch group chat and set as selected and navigate
        const handleGroupClick = async (group) => {
          try {
            const config = {
              headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await axios.get(
              `${import.meta.env.VITE_API_URL}/chat/${group._id}`,
              config
            );
            setSelectedChat(data);
            navigate("/app/chat"); // <-- Add this
          } catch (error) {
            console.error("Error opening group chat:", error);
          }
        };

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
        {Array.isArray(activeUsers) && activeUsers.filter(Boolean).map((u, idx) => (
          <ConversationsItem
            props={u}
            key={u?._id ?? idx}
            unreadCount={u?.unreadCount ?? 0}
            onClick={() => handleUserClick(u)}
          />
        ))}
        {activeGroups.map((g) => (
          <ConversationsItem
            props={{ name: g.chatName, _id: g._id }}
            key={g._id}
            unreadCount={g.unreadCount}
            onClick={() => handleGroupClick(g)}
            isGroup={true}
          />
        ))}
       </div>
          
    </div>
  )
}

export default Sidebar
