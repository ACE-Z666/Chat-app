import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

export default function CreateGroups() {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]); // selected users
  const [allUsers, setAllUsers] = useState([]); // all available users
  const lightTheme = useSelector((state) => state.theme.light);
  const user = useSelector((state) => state.auth.user);

  const socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });

  // Fetch all users except current user
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/chat`,
          config
        );
        setAllUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchAllUsers();
  }, [user]);

  const createGroup = async () => {
    if (!groupName || !users.length) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat/group`,
        {
          chatName: groupName,
          users: users.map((user) => user._id),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Group created successfully:", response.data);
      alert("Group created successfully!");
      setGroupName("");
      setUsers([]);
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Error creating group. Please try again.");
    }
  };

  const handleUserSelect = (selectedUser) => {
    if (users.some((u) => u._id === selectedUser._id)) {
      setUsers(users.filter((user) => user._id !== selectedUser._id));
    } else {
      setUsers([...users, selectedUser]);
    }
  };

  return (
    <div className="flex flex-col h-full w-[63vw] rounded-tr-2xl rounded-br-2xl items-center justify-center">
      <div
        className={
          "w-2/3 h-2/3 bg-[#e0dfd5] rounded-xl shade-g" +
          (lightTheme ? "" : " dark-theme")
        }
      >
        <div className="flex flex-col items-center justify-center gap-y-10 my-24">
          <div>
            <p
              className={
                "text-2xl font-semibold" +
                (lightTheme ? " text-gray-800" : " text-white")
              }
            >
              Create Groups
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-[20vw] bg-[#e8e9eb] rounded-full px-4 border-none outline-none h-10 text-black"
            />
          </div>
          <div className="w-[20vw] max-h-[20vh] overflow-y-auto bg-[#e8e9eb] rounded-xl p-2 mb-2">
            <p className="font-semibold mb-2 text-gray-700">Add Users:</p>
            {allUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => handleUserSelect(u)}
                className={
                  "cursor-pointer px-2 py-1 rounded-md mb-1 transition-all " +
                  (users.some((sel) => sel._id === u._id)
                    ? "bg-[#d18109] text-white"
                    : "hover:bg-[#f1ce01] hover:text-black")
                }
              >
                {u.name}{" "}
                <span className="text-xs text-gray-500">({u.email})</span>
                {users.some((sel) => sel._id === u._id) && (
                  <span className="ml-2 text-xs">✔</span>
                )}
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={createGroup}
              className="w-[10vw] h-10 bg-[#d18109] rounded-xl text-[#faf9f9] font-semibold hover:text-[#000000] hover:bg-[#ffffff] transition-all"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
