import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'
import logo1 from '../assets/logo1.png'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Groups({ setSelectedChat }) {
  const lightTheme = useSelector((state) => state.theme.light);
  const [groups, setGroups] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get("http://localhost:8080/chat/active-groups", config);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [user]);

  // Handle group click: fetch group chat and set as selected
  const handleGroupClick = async (group) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      // Fetch the group chat details
      const { data } = await axios.get(`http://localhost:8080/chat/${group._id}`, config);
      setSelectedChat(data);
      navigate("/app/chat"); // <-- navigate to chat area
    } catch (error) {
      console.error("Error opening group chat:", error);
    }
  };

  return (
    <div className=' h-full w-[63vw] px-6 rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2'>
        <div className={'h-[7vh] w-full flex justify-start items-center text-stone-500 bg-[#E0DFD5] rounded-xl px-6 pb-4 shade-g pt-4' + (lightTheme ? "" : " dark-theme1")}>
            <img src={logo1} alt="logo" className='h-[7vh]'/>
            <p className='text-xl font-bold font-sans pl-2'>Available Groups</p>
       </div>
       <div className={'h-[7vh] w-[100%] flex items-center justify-start rounded-full bg-[#E0DFD5] px-5 mt-3 shade-g text-gray-800' + (lightTheme ? "" : " dark-theme1")} > 
        <IconButton>
            <SearchIcon className={'scale-125' + (lightTheme ? "" : " text-white")}/>
        </IconButton>
        <input placeholder='Search Users & Groups' className=' pl-2 w-full h-8 bg-transparent border:none outline-none' /></div>
       <div className='flex flex-col mt-4 gap-y-4 overflow-auto rounded-2xl w-full bg-transparent   text-stone-500'>
         {groups.map((group) => (
           <div
             key={group._id}
             className={'h-[7vh] w-full flex justify-start items-center rounded-xl px-9 pb-4 shade-g pt-4 transition-all hover:text-black' + (lightTheme ? " hover:bg-[#f1ce01] text-gray-500 bg-[#E0DFD5] " : " text-white hover:bg-[rgb(240,240,240)] bg-[#2d3941]")}
             onClick={() => handleGroupClick(group)}
           >
             <div className={'' + (lightTheme ? "con-icon" : " con-icon-d")}>{group.chatName[0]}</div>
             <div className='flex flex-col pl-2'>
               <div className='flex items-center'>
                 <p className='text-lg font-semibold pl-2'>{group.chatName}</p>
                 {group.unreadCount > 0 && (
                   <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                     {group.unreadCount}
                   </span>
                 )}
               </div>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
}
