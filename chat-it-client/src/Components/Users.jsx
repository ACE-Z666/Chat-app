import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function Users({ setSelectedChat }) {
  const lightTheme = useSelector((state) => state.theme.light);
  const user = JSON.parse(localStorage.getItem("userData"));
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
  const navigate = useNavigate();

  // Initialize socket connection
  const socket = io(import.meta.env.VITE_API_URL);

  // Fetch all users on mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/chat`,
          config
        );
        setAllUsers(data.data); // Store all users
        setFilteredUsers(data.data); // Initially, show all users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    if (!search.trim()) {
      setFilteredUsers(allUsers); // Show all users if search is empty
    } else {
      const filtered = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [search, allUsers]);

  // Handle user selection
  const handleUserSelect = async (selectedUser) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Create or fetch a one-on-one chat
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        { userId: selectedUser._id },
        config
      );

      setSelectedChat(data); // Set the selected chat
      navigate("/app/chat"); // Redirect to ChatArea
    } catch (error) {
      console.error("Error selecting user:", error);
      alert("Failed to select user. Please try again.");
    }
  };

  return (
    <div className="h-full w-[63vw] px-6 rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2">
      {/* Header */}
      <div
        className={
          "h-[7vh] w-full flex justify-start items-center text-stone-500 bg-[#E0DFD5] rounded-xl px-6 pb-4 shade-g pt-4" +
          (lightTheme ? "" : " dark-theme1")
        }
      >
        <p className="text-xl font-bold font-sans pl-2">Available Users</p>
      </div>

      {/* Search Bar */}
      <div
        className={
          "h-[7vh] w-[100%] flex items-center justify-start rounded-full bg-[#E0DFD5] px-5 mt-3 shade-g text-gray-800" +
          (lightTheme ? "" : " dark-theme1")
        }
      >
        <IconButton>
          <SearchIcon
            className={"scale-125" + (lightTheme ? "" : " text-white")}
          />
        </IconButton>
        <input
          placeholder="Search Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-2 w-full h-8 bg-transparent border:none outline-none"
        />
      </div>

      {/* User List */}
      <div className="flex flex-col mt-4 gap-y-4 overflow-auto rounded-2xl w-full bg-transparent text-stone-500">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className={
              "h-[7vh] w-full flex justify-start items-center rounded-xl px-9 pb-4 shade-g pt-4 transition-all hover:text-black" +
              (lightTheme
                ? " hover:bg-[#f1ce01] text-gray-500 bg-[#E0DFD5]"
                : " text-white hover:bg-[rgb(240,240,240)] bg-[#2d3941]")
            }
            onClick={() => handleUserSelect(user)}
          >
            <div className={"" + (lightTheme ? "con-icon" : " con-icon-d")}>
              {user.name[0]}
            </div>
            <div className="flex flex-col pl-2">
              <div>
                <p className="text-lg font-semibold pl-2">{user.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}